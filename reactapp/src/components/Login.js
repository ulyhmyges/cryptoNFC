import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Login({ setRole }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roleFromBackend = "marchant";

    setRole(roleFromBackend);

    navigate("/home");
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Nom d'utilisateur ou Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
