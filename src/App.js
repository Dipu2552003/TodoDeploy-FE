import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    fetchTodos();
    console.log("API URL:", process.env.REACT_APP_API_URL);
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      setTodos(response.data);
      setBackendConnected(true); // Backend is connected if the request is successful
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, {
        title: newTodo,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Todo List</h1>
      {backendConnected ? (
        <div className="alert alert-success">Backend connected</div>
      ) : (
        <div className="alert alert-danger">Backend not connected</div>
      )}
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
