import React, { useState, useEffect } from "react";
import "./Portfolio.css";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    // Fetching the stored portfolio from localStorage
    const storedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || [];

    // Filter out items with count of 0 (only show purchased stocks)
    const purchasedItems = storedPortfolio.filter(stock => stock.count > 0);

    // If there are no purchased items, the portfolio will be empty
    setPortfolio(purchasedItems);
  }, []); // Empty dependency array means this runs once on component mount

  const sellStock = (id) => {
    let quantity = prompt("Enter quantity to sell:");
    quantity = parseInt(quantity);

    // Validate quantity
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity!");
      return;
    }

    // Update portfolio with the sold stock quantity
    let updatedPortfolio = portfolio.map((stock) => {
      if (stock.id === id) {
        if (stock.count < quantity) {
          alert("Not enough stocks to sell!");
          return stock;
        }
        stock.count -= quantity;
        if (stock.count === 0) return null; // Remove the stock if count becomes 0
      }
      return stock;
    }).filter(Boolean); // Remove null entries after selling

    // Save updated portfolio to state and localStorage
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  return (
    <div className="portfolio-container">
      <h2>Your Portfolio</h2>
      <div className="portfolio-list">
        {portfolio.length === 0 ? (
          <p>No stocks purchased yet.</p>
        ) : (
          portfolio.map((stock) => (
            <div key={stock.id} className="portfolio-card">
              <img
                src={stock.logo}
                alt={stock.name}
                className="stock-logo"
                onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
              />
              <p><strong>{stock.name}</strong></p>
              <p>Price: ${stock.price}</p>
              <p>Quantity: {stock.count}</p>
              <button onClick={() => sellStock(stock.id)}>Sell</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portfolio;
