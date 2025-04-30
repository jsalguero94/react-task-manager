import { useState, useRef, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

/**
 * Component for displaying and interacting with an individual task
 * Supports viewing, editing, completing, and deleting tasks
 * @param task - The task object to display
 */
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // State to track if task is in edit mode
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // State for tracking the edited title value
  const [editTitle, setEditTitle] = useState<string>(task.title);
  // Get task manipulation functions from context
  const { toggleTask, deleteTask, editTask } = useTasks();
  // Reference to edit input for focus management
  const editInputRef = useRef<HTMLInputElement>(null);

  // Focus the edit input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      // Position cursor at the end of text
      editInputRef.current.setSelectionRange(
        editTitle.length,
        editTitle.length,
      );
    }
  }, [isEditing, editTitle.length]);

  /**
   * Enter edit mode for the task
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Save edited task title
   */
  const handleSave = () => {
    if (editTitle.trim()) {
      editTask(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  /**
   * Handle keyboard shortcuts in the edit input
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Save changes on Enter key
      handleSave();
    } else if (e.key === "Escape") {
      // Cancel editing on Escape key
      setEditTitle(task.title);
      setIsEditing(false);
    }
  };

  /**
   * Format the task creation date in a user-friendly way
   * @param dateString - ISO date string
   * @returns Formatted date string
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        {/* Checkbox for toggling completion status */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
        />

        {isEditing ? (
          // Edit mode - show input
          <input
            ref={editInputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="edit-input"
            aria-label={`Edit task "${task.title}"`}
          />
        ) : (
          // View mode - show task info
          <div className="task-info">
            <span className="task-title">{task.title}</span>
            <span className="task-date">{formatDate(task.createdAt)}</span>
          </div>
        )}
      </div>

      <div className="task-actions">
        {!isEditing && (
          <>
            {/* Action buttons only shown in view mode */}
            <button
              onClick={handleEdit}
              className="edit-btn"
              aria-label={`Edit task "${task.title}"`}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-btn"
              aria-label={`Delete task "${task.title}"`}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
