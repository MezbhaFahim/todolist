import React, { useEffect, useState } from 'react';
import Create from './Create'; 
import axios from 'axios';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState("");
  const [isEditing, setIsEditing] = useState(null); 

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const fetchTasks = async () => {
    try {
      const result = await axios.get("http://localhost:3001/get");
      setTodos(result.data); 
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };


  const handleAdd = async (newTask) => {
    try {
      const result = await axios.post("http://localhost:3001/add", { task: newTask });
      console.log("Task added:", result.data); 

      
      setTodos(prevTodos => [...prevTodos, result.data]); 
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("Task already exists!"); 
      } else {
        console.error("Error adding task:", err);
      }
    }
  };



  const handleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };




  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setTodos(todos.filter(todo => todo._id !== id)); 
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };



  const handleEdit = async (id) => {
    try {
      const result = await axios.put(`http://localhost:3001/edit/${id}`, { task: editTask });
      setTodos(todos.map(todo => (todo._id === id ? result.data : todo))); 
      setIsEditing(null); 
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };





  return (
    <div className="d-flex flex-column align-items-center min-vh-100">
      <Create onAddTask={handleAdd} />
      {todos.length === 0 ? (
        <div className="mt-3">
          <h2 className="text-center fw-bold text-color-black">No task added yet</h2>
        </div>
      ) : (
        todos.map((todo, index) => (
          <div key={index} className="task-box mt-2 d-flex align-items-center justify-content-between">
            {isEditing === todo._id ? (
              <input
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="form-control"
                placeholder="Edit task"
              />
            ) : (
              <>
                <i
                  className={`bi bi-check-square checkbox-icon ${todo.completed ? 'completed' : ''}`}
                  onClick={() => handleComplete(todo._id)}
                ></i>
                <span className={`task-text ${todo.completed ? 'text-crossed' : ''}`}>
                  {todo.task}
                </span>
                <i
                  className="bi bi-pencil-square"
                  onClick={() => {
                    setIsEditing(todo._id);
                    setEditTask(todo.task); 
                  }}
                ></i>
                <i
                  className="bi bi-trash trash-icon"
                  onClick={() => handleDelete(todo._id)}
                ></i>
              </>
            )}
            {isEditing === todo._id && (
              <button className="btn btn-success ms-2" onClick={() => handleEdit(todo._id)}>
                Save
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
