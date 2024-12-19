import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import TodoList from "./components/TodoList/TodoList";
import Home from "./components/Home";
import Layout from "./components/Layout/Layout";
import TaskList from "./components/TodoList/TaskList";
import Logout from "./components/Auth/Logout";
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/todo-list/:id" element={<TaskList />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
