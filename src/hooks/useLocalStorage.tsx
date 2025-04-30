import { useState, useEffect } from "react";

/**
 * Custom hook for persisting and retrieving data from localStorage
 * @param key - The localStorage key to use for storing the data
 * @param initialValue - The initial value to use if no data is found in localStorage
 * @returns A stateful value and a function to update it, similar to useState
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize state with function to avoid unnecessary localStorage access on every render
  const [value, setValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = localStorage.getItem(key);
      // Parse stored json or return initialValue if none
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage whenever value changes
  useEffect(() => {
    try {
      // Save to local storage
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Handle errors
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
