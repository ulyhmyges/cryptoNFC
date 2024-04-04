import React from "react";
import "./styles.css";

function Home({ role }) {
  const handleMerchantTransaction = () => {
    // Logique pour la transaction du marchand (à implémenter plus tard)
    console.log("Transaction du marchand");
  };

  const handleClientTransaction = () => {
    // Logique pour la transaction du client (à implémenter plus tard)
    console.log("Transaction du client");
  };

  return (
    <div className="container">
      <h2>Page d'accueil</h2>
      {role === "marchant" && (
        <form onSubmit={handleMerchantTransaction}>
          <h3>Envoyer une transaction (marchand)</h3>
          <input type="text" placeholder="Adresse wallet du client" required />
          <input type="number" placeholder="Montant dû en ether" required />
          <button type="submit">Transact</button>
        </form>
      )}
      {role === "client" && (
        <form onSubmit={handleClientTransaction}>
          <h3>Recevoir une transaction (client)</h3>
          <input
            type="text"
            placeholder="Adresse wallet du marchand"
            required
          />
          <input
            type="number"
            placeholder="Montant à recevoir en ether"
            required
          />
          <button type="submit">Transact</button>
        </form>
      )}
    </div>
  );
}

export default Home;
