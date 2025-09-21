import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import "./Stocks.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const demoStocks = [
  { id: 1, name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
  { id: 2, name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
  { id: 3, name: "Google", logo: "https://logo.clearbit.com/google.com" },
  { id: 4, name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
  { id: 5, name: "Tesla", logo: "https://logo.clearbit.com/tesla.com" },
  { id: 6, name: "Meta", logo: "https://logo.clearbit.com/meta.com" },
  { id: 7, name: "Netflix", logo: "https://logo.clearbit.com/netflix.com" },
  { id: 8, name: "Nvidia", logo: "https://logo.clearbit.com/nvidia.com" },
  { id: 9, name: "Intel", logo: "https://logo.clearbit.com/intel.com" },
  { id: 10, name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
  { id: 11, name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com" },
  { id: 12, name: "PayPal", logo: "https://logo.clearbit.com/paypal.com" },
  { id: 13, name: "Uber", logo: "https://logo.clearbit.com/uber.com" },
  { id: 14, name: "Airbnb", logo: "https://logo.clearbit.com/airbnb.com" },
  { id: 15, name: "Spotify", logo: "https://logo.clearbit.com/spotify.com" },
  { id: 16, name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
  { id: 17, name: "Oracle", logo: "https://logo.clearbit.com/oracle.com" },
  { id: 18, name: "Qualcomm", logo: "https://logo.clearbit.com/qualcomm.com" },
  { id: 19, name: "AMD", logo: "https://logo.clearbit.com/amd.com" },
  { id: 20, name: "Zoom", logo: "https://logo.clearbit.com/zoom.us" }
];

const Stocks = ({ updatePortfolio }) => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [stockNews, setStockNews] = useState([]);
  const [dailyChange, setDailyChange] = useState(null);

  useEffect(() => {
    const stocksWithPrices = demoStocks.map(stock => ({
      ...stock,
      price: (Math.random() * 1000 + 10).toFixed(2)
    }));
    setStocks(stocksWithPrices);
  }, []);

  const fetchStockDetails = (stock) => {
    const priceStart = parseFloat(stock.price) - Math.random() * 10;
    const priceEnd = parseFloat(stock.price);
    const dataPoints = [priceStart, priceStart + 2, priceEnd - 3, priceEnd];

    const chartData = {
      labels: ['9:00', '12:00', '15:00', '16:00'],
      datasets: [{
        label: `${stock.name} Stock Price`,
        data: dataPoints,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.3,
        fill: false,
      }]
    };

    const profitLoss = (dataPoints[3] - dataPoints[0]).toFixed(2);

    setStockData(chartData);
    setDailyChange(profitLoss);

    const stockNews = [
      { title: `Breaking News: ${stock.name} hits new highs`, url: 'https://example.com' },
      { title: `${stock.name} introduces a new product`, url: 'https://example.com' }
    ];
    setStockNews(stockNews);
  };

  const buyStock = (stock) => {
    let quantity = prompt("Enter quantity to buy:");
    quantity = parseInt(quantity);

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity!");
      return;
    }

    const current = JSON.parse(localStorage.getItem("portfolio")) || [];
    const exists = current.find((s) => s.id === stock.id);

    let updated;
    if (exists) {
      updated = current.map((s) =>
        s.id === stock.id ? { ...s, count: s.count + quantity } : s
      );
    } else {
      updated = [...current, { ...stock, count: quantity }];
    }

    localStorage.setItem("portfolio", JSON.stringify(updated));
    updatePortfolio(updated);
    alert(`${quantity} ${stock.name} stock(s) bought at $${stock.price} each!`);
  };

  const renderStockDetails = () => {
    if (!selectedStock) return null;

    const todayLow = (Math.random() * 50 + 100).toFixed(2);
    const todayHigh = (Math.random() * 50 + 150).toFixed(2);

    return (
      <div className="stock-details">
        <h3>{selectedStock.name} Overview</h3>
        <p><strong>Today's Low:</strong> ${todayLow}</p>
        <p><strong>Today's High:</strong> ${todayHigh}</p>
        <p><strong>Today's Change:</strong> <span style={{ color: dailyChange >= 0 ? "green" : "red" }}>
          {dailyChange >= 0 ? "+" : "-"}${Math.abs(dailyChange)}
        </span></p>

        <h3>Stock Chart</h3>
        {stockData ? (
          <Line data={stockData} key={selectedStock.id} />
        ) : (
          <p>Loading graph...</p>
        )}

        <h3>Latest News</h3>
        {stockNews.length > 0 ? (
          stockNews.map((news, index) => (
            <div key={index}>
              <a href={news.url} target="_blank" rel="noopener noreferrer">{news.title}</a>
            </div>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    );
  };

  return (
    <div className="stocks-container">
      <h2>Available Stocks</h2>

      <div className="stocks-list">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="stocks-card"
            onClick={() => {
              setSelectedStock(stock);
              fetchStockDetails(stock);
            }}
          >
            <img src={stock.logo} alt={stock.name} className="stock-logo" />
            <p><strong>{stock.name}</strong></p>
            <p>Price: ${stock.price}</p>
            <button onClick={(e) => { e.stopPropagation(); buyStock(stock); }}>Buy</button>
          </div>
        ))}
      </div>

      {renderStockDetails()}
    </div>
  );
};

export default Stocks;
