import { useState, useCallback, useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import { TaskFilter as FilterType, Task } from "../types";

/**
 * Component that displays the list of tasks and filtering options
 * Uses optimization techniques like useMemo and useCallback
 */
const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  // State for the current filter
  const [filter, setFilter] = useState<FilterType>("all");

  /**
   * Callback for handling filter changes
   * Using useCallback to prevent unnecessary re-renders of TaskFilter
   */
  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  /**
   * Memoized filtered tasks based on the current filter
   * Only recalculates when tasks array or filter changes
   */
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // If there are no tasks at all, show an empty state message
  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <p>You don't have any tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Filter controls */}
      <TaskFilter onFilterChange={handleFilterChange} />

      {/* Task list with filtered tasks */}
      <div className="task-list" role="list">
        {filteredTasks.length > 0 ? (
          // Map each filtered task to a TaskItem component
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          // Show message when no tasks match the current filter
          <p className="no-tasks" role="status">
            No tasks match the current filter
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
