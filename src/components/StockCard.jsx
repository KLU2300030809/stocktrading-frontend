// StockCard.jsx
export default function StockCard({ stock }) {
  const handleBuy = () => {
    alert(`Bought 1 share of ${stock.name}`);
    // Here you can implement state to store in portfolio
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
      <h3>{stock.name} ({stock.symbol})</h3>
      <p>Price: ${stock.price}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
}
