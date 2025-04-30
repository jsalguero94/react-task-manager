import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Task, TaskContextType, TaskAction } from "../types";

// Create context with a default value
// The default value is only used when a component does not have a matching Provider above it in the tree
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Action types as constants to avoid typos
const ADD_TASK = "ADD_TASK";
const TOGGLE_TASK = "TOGGLE_TASK";
const DELETE_TASK = "DELETE_TASK";
const EDIT_TASK = "EDIT_TASK";

/**
 * Reducer function to handle state updates in a predictable way
 * @param state - Current array of tasks
 * @param action - Action object with type and payload
 * @returns New state (array of tasks)
 */
const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case ADD_TASK:
      // Add new task to the beginning of the array
      return [action.payload, ...state];
    case TOGGLE_TASK:
      // Map through tasks and toggle the completed status of the matching task
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    case DELETE_TASK:
      // Filter out the task with the matching id
      return state.filter((task) => task.id !== action.payload);
    case EDIT_TASK:
      // Map through tasks and update the title of the matching task
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.title }
          : task,
      );
    default:
      // Return unchanged state for unknown actions
      return state;
  }
};

interface TaskProviderProps {
  children: ReactNode;
}

/**
 * Provider component that wraps app and makes task context available to any child component
 * @param children - Child components that will have access to the context
 */
export const TaskProvider = ({ children }: TaskProviderProps) => {
  // Use custom hook to persist tasks in localStorage
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  // Use reducer to manage tasks state
  const [state, dispatch] = useReducer(taskReducer, tasks);

  // Sync reducer state with localStorage whenever state changes
  useEffect(() => {
    setTasks(state);
  }, [state, setTasks]);

  /**
   * Adds a new task with the given title
   * @param title - Title of the task to add
   */
  const addTask = (title: string) => {
    dispatch({
      type: ADD_TASK,
      payload: {
        id: Date.now().toString(), // Use timestamp as a simple unique ID
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    });
  };

  /**
   * Toggles the completed status of a task
   * @param id - ID of the task to toggle
   */
  const toggleTask = (id: string) => {
    dispatch({
      type: TOGGLE_TASK,
      payload: id,
    });
  };

  /**
   * Deletes a task
   * @param id - ID of the task to delete
   */
  const deleteTask = (id: string) => {
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };

  /**
   * Edits the title of a task
   * @param id - ID of the task to edit
   * @param title - New title for the task
   */
  const editTask = (id: string, title: string) => {
    dispatch({
      type: EDIT_TASK,
      payload: { id, title },
    });
  };

  // Value object provided to consumers of the context
  const contextValue: TaskContextType = {
    tasks: state,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

/**
 * Custom hook that provides access to the task context
 * @returns Task context object with tasks and methods
 * @throws Error if used outside of TaskProvider
 */
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
