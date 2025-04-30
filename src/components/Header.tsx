import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

/**
 * Header component that displays the app title and task statistics
 * Uses derived state to calculate statistics based on tasks
 */
const Header = () => {
  const { tasks } = useTasks();
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [pendingCount, setPendingCount] = useState<number>(0);

  // Update statistics whenever tasks change
  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    setCompletedCount(completed);
    setPendingCount(tasks.length - completed);
  }, [tasks]);

  return (
    <header className="header">
      <h1>Task Manager</h1>
      <div className="stats">
        <div className="stat">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">{completedCount}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pending:</span>
          <span className="stat-value">{pendingCount}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
