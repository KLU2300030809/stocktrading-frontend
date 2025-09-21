// src/components/Market.jsx
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { fetchStockData } from '../utils/fetchStockData';  // Import the fetchStockData function
import './Market.css';

const demoStocks = [
  { id: 1, name: 'Apple', symbol: 'AAPL', logo: 'https://logo.clearbit.com/apple.com' },
  { id: 2, name: 'Amazon', symbol: 'AMZN', logo: 'https://logo.clearbit.com/amazon.com' },
  { id: 3, name: 'Google', symbol: 'GOOGL', logo: 'https://logo.clearbit.com/google.com' },
  { id: 4, name: 'Microsoft', symbol: 'MSFT', logo: 'https://logo.clearbit.com/microsoft.com' },
  { id: 5, name: 'Tesla', symbol: 'TSLA', logo: 'https://logo.clearbit.com/tesla.com' },
  { id: 6, name: 'Meta', symbol: 'META', logo: 'https://logo.clearbit.com/meta.com' },
  { id: 7, name: 'Netflix', symbol: 'NFLX', logo: 'https://logo.clearbit.com/netflix.com' },
  { id: 8, name: 'NVIDIA', symbol: 'NVDA', logo: 'https://logo.clearbit.com/nvidia.com' },
  { id: 9, name: 'AMD', symbol: 'AMD', logo: 'https://logo.clearbit.com/amd.com' },
  { id: 10, name: 'Spotify', symbol: 'SPOT', logo: 'https://logo.clearbit.com/spotify.com' },
  { id: 11, name: 'Snapchat', symbol: 'SNAP', logo: 'https://logo.clearbit.com/snapchat.com' },
  { id: 12, name: 'Uber', symbol: 'UBER', logo: 'https://logo.clearbit.com/uber.com' },
];

const defaultStockData = [
  { time: '2023-05-01', price: 150 },
  { time: '2023-05-02', price: 153 },
  { time: '2023-05-03', price: 152 },
  { time: '2023-05-04', price: 155 },
  // Add more default data as needed
];

const Market = () => {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      const data = {};
      for (const stock of demoStocks) {
        const stockChartData = await fetchStockData(stock.symbol);  // Call the utility function
        data[stock.symbol] = stockChartData;
      }
      setStockData(data);
    };

    fetchAllData();
  }, []); // Fetch data when component mounts

  return (
    <div className="market-container">
      <h2>Market Data & Analytics</h2>
      {demoStocks.map((stock) => (
        <div key={stock.id} className="stock-chart">
          <h3>
            <img src={stock.logo} alt={stock.name} className="stock-logo" />
            {stock.name} ({stock.symbol})
          </h3>
          {stockData[stock.symbol] && stockData[stock.symbol].length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stockData[stock.symbol]}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
             <XAxis dataKey="time" tickFormatter={(time) => time?.split(' ')[1]} />

                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={defaultStockData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="time" tickFormatter={(time) => time.slice(11, 16)} />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      ))}
    </div>
  );
};

export default Market;
