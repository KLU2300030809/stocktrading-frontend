// StockList.jsx
import { useEffect, useState } from 'react';
import StockCard from './StockCard';

export default function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-api.com/stocks")
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => console.error("Error fetching stocks", err));
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', padding: '1rem' }}>
      {stocks.map(stock => (
        <StockCard key={stock.id} stock={stock} />
      ))}
    </div>
  );
}
