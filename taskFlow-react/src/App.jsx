import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if(saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks and theme
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("theme", theme);
  }, [tasks, theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Task handlers
  const addTask = (text) => {
    if(!text.trim()) return;
    setTasks([...tasks, { text, completed:false }]);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  };

  // Filtered tasks
  const filteredTasks = tasks.filter(task => {
    if(filter === "all") return true;
    if(filter === "active") return !task.completed;
    if(filter === "completed") return task.completed;
  });

  return (
    <div className={theme}>
      <button className="themeToggle" onClick={toggleTheme}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
      <div className="container">
        <h1>TaskFlow</h1>
        <p>{tasks.filter(t=>t.completed).length}/{tasks.length} completed</p>
        <TaskInput addTask={addTask} />
        <Filters setFilter={setFilter} />
        <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask}/>
      </div>
    </div>
  );
}
