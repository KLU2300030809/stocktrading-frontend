// src/utils/fetchStockData.js
export async function fetchStockData(symbol) {
  // Simulated dynamic prices for demo purposes
  const now = new Date();
  const timePoints = Array.from({ length: 10 }, (_, i) => {
    const time = new Date(now.getTime() - i * 30 * 60000); // every 30 minutes
    return {
      time: time.toISOString().slice(0, 16).replace('T', ' '),
      price: parseFloat((100 + Math.random() * 50).toFixed(2)),
    };
  }).reverse();

  // Log the stock symbol and the generated data for debugging
  console.log(symbol, timePoints);

  return timePoints;
}
