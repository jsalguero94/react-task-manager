import { useState } from "react";
import { TaskFilter as FilterType } from "../types";

interface TaskFilterProps {
  onFilterChange: (filter: FilterType) => void;
}

/**
 * Component for filtering tasks by their completion status
 * @param onFilterChange - Callback function triggered when filter changes
 */
const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  // Track which filter is currently active
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  /**
   * Update both local state and parent component when filter changes
   * @param filter - The new filter value
   */
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="task-filter" role="toolbar" aria-label="Filter tasks">
      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => handleFilterChange("all")}
        aria-pressed={activeFilter === "all"}
      >
        All
      </button>
      <button
        className={activeFilter === "active" ? "active" : ""}
        onClick={() => handleFilterChange("active")}
        aria-pressed={activeFilter === "active"}
      >
        Active
      </button>
      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => handleFilterChange("completed")}
        aria-pressed={activeFilter === "completed"}
      >
        Completed
      </button>
    </div>
  );
};

export default TaskFilter;
