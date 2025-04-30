import { useState, useRef, useEffect } from "react";
import { useTasks } from "../context/TaskContext";

/**
 * Form component for adding new tasks
 * Uses controlled inputs, manages form state and validation
 */
const TaskForm: React.FC = () => {
  // State for the input value
  const [title, setTitle] = useState<string>("");
  // State for validation error messages
  const [error, setError] = useState<string>("");
  // Get addTask function from context
  const { addTask } = useTasks();
  // Reference to input element for focus management
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * Handle form submission
   * @param e - Form submit event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    // Add task, reset form, and refocus input
    addTask(title.trim());
    setTitle("");
    setError("");
    inputRef.current?.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={error ? "error" : ""}
          aria-label="Task title"
        />
        <button type="submit">Add Task</button>
      </div>
      {/* Show error message if validation fails */}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default TaskForm;
