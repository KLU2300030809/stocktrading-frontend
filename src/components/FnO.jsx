import React, { useEffect, useState } from "react";
import "./FnO.css";

const demoStocks = [
  { name: "RELIANCE", price: 238.6 },
  { name: "TATASTEEL", price: 145.4 },
  { name: "INFY", price: 15.45 },
  { name: "HDFCBANK", price: 156.4 },
  { name: "ICICIBANK", price: 780.9 },
];

const FnO = () => {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [movers, setMovers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    setTimeout(() => {
      const failChance = Math.random();
      if (failChance < 0.1) {
        setError("Failed to fetch stock data. Please try again.");
        setLoading(false);
        return;
      }

      const updatedStocks = demoStocks.map((stock) => {
        const changeValue = (Math.random() * 14 - 7).toFixed(1); // -7 to +7
        const changeStr = (changeValue > 0 ? "+" : "") + changeValue + "%";
        const priceFluctuation = stock.price * (Math.random() * 0.1 - 0.05);
        const newPrice = (stock.price + priceFluctuation).toFixed(2);

        return {
          ...stock,
          change: changeStr,
          price: parseFloat(newPrice),
        };
      });

      setGainers(updatedStocks.filter((s) => s.change.startsWith("+")));
      setLosers(updatedStocks.filter((s) => s.change.startsWith("-")));
      setMovers(updatedStocks);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortStocks = (stocks) => {
    return [...stocks].sort((a, b) => {
      const changeA = parseFloat(a.change);
      const changeB = parseFloat(b.change);
      return changeB - changeA;
    });
  };

  const getColorClass = (change) => {
    const val = parseFloat(change);
    return val > 0 ? "positive" : "negative";
  };

  const getVolatility = (change) => {
    const val = Math.abs(parseFloat(change));
    if (val >= 5) return "High";
    if (val >= 2) return "Medium";
    return "Low";
  };

  return (
    <div className="fno-container">
      <h2>📊 Futures & Options (F&O) Summary</h2>
      <button className="refresh-button" onClick={fetchData}>
        🔄 Refresh Data
      </button>

      {loading ? (
        <p className="loading">Loading data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="fno-section">
            <h3>📈 Top Gainers</h3>
            <ul>
              {sortStocks(gainers).map((stock, i) => (
                <li key={i} className={`stock-item ${getColorClass(stock.change)}`}>
                  <div className="stock-info">
                    <p>
                      <strong>{stock.name}</strong> – {stock.change}
                    </p>
                    <p>Price: ₹{stock.price}</p>
                    <p>Volatility: {getVolatility(stock.change)}</p>
                    <div
                      className="change-bar"
                      style={{
                        width: `${Math.abs(parseFloat(stock.change)) * 10}px`,
                        backgroundColor:
                          getColorClass(stock.change) === "positive" ? "green" : "red",
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="fno-section">
            <h3>📉 Top Losers</h3>
            <ul>
              {sortStocks(losers).map((stock, i) => (
                <li key={i} className={`stock-item ${getColorClass(stock.change)}`}>
                  <div className="stock-info">
                    <p>
                      <strong>{stock.name}</strong> – {stock.change}
                    </p>
                    <p>Price: ₹{stock.price}</p>
                    <p>Volatility: {getVolatility(stock.change)}</p>
                    <div
                      className="change-bar"
                      style={{
                        width: `${Math.abs(parseFloat(stock.change)) * 10}px`,
                        backgroundColor:
                          getColorClass(stock.change) === "positive" ? "green" : "red",
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="fno-section">
            <h3>📌 All Movers</h3>
            <ul>
              {sortStocks(movers).map((stock, i) => (
                <li key={i} className={`stock-item ${getColorClass(stock.change)}`}>
                  <div className="stock-info">
                    <p>
                      <strong>{stock.name}</strong> – {stock.change}
                    </p>
                    <p>Price: ₹{stock.price}</p>
                    <p>Volatility: {getVolatility(stock.change)}</p>
                    <div
                      className="change-bar"
                      style={{
                        width: `${Math.abs(parseFloat(stock.change)) * 10}px`,
                        backgroundColor:
                          getColorClass(stock.change) === "positive" ? "green" : "red",
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default FnO;
