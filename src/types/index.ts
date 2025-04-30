/**
 * Type definition for a Task object
 * @property id - Unique identifier for the task
 * @property title - The title/description of the task
 * @property completed - Boolean indicating whether the task is completed
 * @property createdAt - ISO string representation of when the task was created
 */
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

/**
 * Union type for possible task filter values
 */
export type TaskFilter = "all" | "active" | "completed";

/**
 * Type definition for task context state
 * @property tasks - Array of task objects
 * @property addTask - Function to add a new task
 * @property toggleTask - Function to toggle completion status of a task
 * @property deleteTask - Function to delete a task
 * @property editTask - Function to edit a task's title
 */
export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, title: string) => void;
}

/**
 * Type definition for task action objects in the reducer
 */
export type TaskAction =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "EDIT_TASK"; payload: { id: string; title: string } };
