import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [isConnected, setIsConnected] = useState(false); // Add connection state

  useEffect(() => {
    checkBackendConnection(); // Check connection first
    fetchTodos();
    console.log("API URL:", process.env.REACT_APP_API_URL);
  }, []);

  const checkBackendConnection = async () => {
    try {
      // Make a quick test request to see if backend is reachable
      await axios.get(`${process.env.REACT_APP_API_URL}`);
      setIsConnected(true); // Set connected if request is successful
    } catch (error) {
      setIsConnected(false); // Set not connected on failure
      console.error("Backend is not connected:", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/todos`
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/todos`,
        {
          title: newTodo,
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Todo List</h1>

      {/* Connection status indicator */}
      <div className="mb-3">
        {isConnected ? (
          <span style={{ color: "green" }}>● Connected to Backend</span>
        ) : (
          <span style={{ color: "red" }}>● Not Connected</span>
        )}
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo._id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
