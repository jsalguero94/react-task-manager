import { TaskProvider } from "./context/TaskContext";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

/**
 * Main application component
 * Wraps all child components in the TaskProvider to make
 * task state and functions available throughout the app
 */
const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
};

export default App;
