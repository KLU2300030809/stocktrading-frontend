import React from "react";

const Watchlist = ({ watchlist, updateWatchlist }) => {
  const removeFromWatchlist = (stock) => {
    const updatedWatchlist = watchlist.filter(item => item.id !== stock.id);
    updateWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>
      {watchlist.length > 0 ? (
        watchlist.map((stock) => (
          <div key={stock.id} className="watchlist-item">
            <img src={stock.logo} alt={stock.name} className="stock-logo" />
            <p><strong>{stock.name}</strong></p>
            <p>Price: ${stock.price}</p>
            <button onClick={() => removeFromWatchlist(stock)}>Remove from Watchlist</button>
          </div>
        ))
      ) : (
        <p>Your watchlist is empty</p>
      )}
    </div>
  );
};

export default Watchlist;
