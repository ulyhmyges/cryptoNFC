import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [role, setRole] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setRole={setRole} />} />{" "}
          <Route path="/home" element={<Home role={role} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
