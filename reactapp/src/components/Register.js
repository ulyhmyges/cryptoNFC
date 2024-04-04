import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    walletAddress: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    navigate("/home");
  };

  return (
    <div className="container">
      {" "}
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="walletAddress"
          placeholder="Adresse wallet (Metamask)"
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
        <select name="role" onChange={handleChange} required>
          <option value="">Sélectionnez un rôle</option>
          <option value="marchant">Marchant</option>
          <option value="client">Client</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
