import React, { useState, useEffect } from "react";

function UserProfile({ user, setUser, toggleDarkMode, darkMode }) {
  const [editableUser, setEditableUser] = useState({ ...user });
  const [originalUser, setOriginalUser] = useState({ ...user });
  const [balance, setBalance] = useState(user.balance || 0);
  const [amountToAdd, setAmountToAdd] = useState("");
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [hoveredButton, setHoveredButton] = useState(null);

  const tradeHistory = editableUser.tradeHistory || [];
  const totalTrades = tradeHistory.length;
  const wins = tradeHistory.filter((trade) => trade.profit > 0).length;
  const winRate = totalTrades ? ((wins / totalTrades) * 100).toFixed(1) : 0;
  const totalProfit = tradeHistory.reduce((acc, t) => acc + (t.profit || 0), 0);
  const portfolioValue = tradeHistory.reduce((sum, t) => sum + t.price * t.shares, 0);

  const skillLevel =
    totalTrades > 50 ? "🎓 Expert" :
    totalTrades > 20 ? "📈 Intermediate" :
    "🧪 Beginner";

  const badges = [];
  if (totalTrades >= 10) badges.push("Active Trader");
  if (winRate >= 70) badges.push("High Accuracy");
  if (totalProfit >= 1000) badges.push("Profit Master");

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableUser((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddMoney = () => {
    const amount = parseFloat(amountToAdd);
    if (!isNaN(amount) && amount > 0) {
      setBalance((prev) => prev + amount);
      setAmountToAdd("");
      alert(`$${amount} added to your balance!`);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  const saveProfile = () => {
    const updatedUser = {
      ...editableUser,
      balance,
      displayName,
      settings: { darkMode },
    };
    setUser(updatedUser);
    setOriginalUser({ ...editableUser });
    alert("Profile saved!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem(user.username);
      setUser(null);
    }
  };

  const downloadTradeHistory = () => {
    const dataStr = JSON.stringify(tradeHistory, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "trade_history.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setEditableUser((prev) => ({
        ...prev,
        portfolioValue: portfolioValue + Math.random() * 10,
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, [portfolioValue]);

  useEffect(() => {
    setEditableUser({ ...user });
    setOriginalUser({ ...user });
    setDisplayName(user.displayName || "");
  }, [user]);

  const colors = {
    background: darkMode ? "#181818" : "#f4f4f4",
    text: darkMode ? "#f9f9f9" : "#1a1a1a",
    card: darkMode ? "#2b2b2b" : "#ffffff",
    border: darkMode ? "#3c3c3c" : "#ddd",
    accent: "#4e89ff",
    green: "#28a745",
    red: "#dc3545",
    purple: "#6f42c1",
    cyan: "#17a2b8",
  };

  const progressBar = (label, value, max = 100, color = colors.accent) => (
    <div style={{ margin: "10px 0" }}>
      <strong>{label}:</strong>
      <div
        style={{
          height: "10px",
          background: "#ccc",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "5px",
        }}
      >
        <div
          style={{
            width: `${Math.min((value / max) * 100, 100)}%`,
            background: color,
            height: "100%",
            transition: "width 0.5s",
          }}
        ></div>
      </div>
    </div>
  );

  // BUTTON STYLE with hover effect but NO color change
  const buttonStyleBase = {
    flex: "1",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: colors.background,
        color: colors.text,
        borderRadius: "16px",
        boxShadow: "0 0 20px rgba(0,0,0,0.15)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>👤 User Profile</h2>

      {/* Profile Info */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <img
            src={editableUser.profilePic || "https://via.placeholder.com/120"}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: `4px solid ${colors.accent}`,
              objectFit: "cover",
            }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePicUpload}
            style={{ marginTop: "10px" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              marginTop: "5px",
              borderRadius: "6px",
              border: `1px solid ${colors.border}`,
              backgroundColor: darkMode ? "#333" : "#fff",
              color: colors.text,
            }}
          />
          <p style={{ marginTop: "10px" }}>
            Skill Level: <strong>{skillLevel}</strong>
          </p>
          <div>
            Badges:
            {badges.length ? (
              badges.map((b, i) => (
                <span key={i} style={{ marginLeft: "8px" }}>
                  🏅 {b}
                </span>
              ))
            ) : (
              <span style={{ marginLeft: "8px" }}>None</span>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          backgroundColor: colors.card,
          padding: "20px",
          borderRadius: "12px",
          border: `1px solid ${colors.border}`,
          marginBottom: "30px",
        }}
      >
        <h3>📊 Statistics</h3>
        {progressBar("Total Trades", totalTrades, 100)}
        {progressBar("Win Rate", winRate, 100, colors.green)}
        {progressBar("Profit", totalProfit, 2000, colors.purple)}

        <p style={{ marginTop: "10px" }}>
          Portfolio Value: <strong>${portfolioValue.toFixed(2)}</strong>
        </p>
      </div>

      {/* Balance + Add Money */}
      <div style={{ marginBottom: "20px" }}>
        <h3>💰 Balance</h3>
        <p>
          Current: <strong>${balance.toFixed(2)}</strong>
        </p>
        <input
          type="number"
          value={amountToAdd}
          placeholder="Amount to add"
          onChange={(e) => setAmountToAdd(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            marginRight: "10px",
            borderRadius: "6px",
            border: `1px solid ${colors.border}`,
            backgroundColor: darkMode ? "#333" : "#fff",
            color: colors.text,
          }}
        />
        <button
          onClick={handleAddMoney}
          disabled={!amountToAdd || isNaN(amountToAdd) || amountToAdd <= 0}
          style={{
            ...buttonStyleBase,
            backgroundColor: colors.accent,
            color: "#fff",
            flex: "initial",
            padding: "10px 15px",
            marginLeft: "10px",
            boxShadow: "0 3px 6px rgba(0, 136, 255, 0.5)",
            ...(hoveredButton === "addFunds"
              ? { transform: "scale(1.05)", boxShadow: "0 6px 12px rgba(0, 136, 255, 0.7)" }
              : {}),
          }}
          onMouseEnter={() => setHoveredButton("addFunds")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          ➕ Add Funds
        </button>
      </div>

      {/* Recent Trades */}
      <div style={{ marginBottom: "30px" }}>
        <h3>📜 Recent Trades</h3>
        <ul>
          {tradeHistory.slice(-3).reverse().map((t, i) => (
            <li key={i}>
              {t.symbol} – {t.shares} shares @ ${t.price} (
              {t.profit >= 0 ? "+" : "-"}${Math.abs(t.profit)})
            </li>
          ))}
          {tradeHistory.length === 0 && <li>No trades yet</li>}
        </ul>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <button
          onClick={saveProfile}
          style={{
            ...buttonStyleBase,
            backgroundColor: colors.accent,
            color: "#fff",
            boxShadow: "0 3px 6px rgba(0, 114, 255, 0.5)",
            ...(hoveredButton === "save"
              ? { transform: "scale(1.05)", boxShadow: "0 6px 12px rgba(0, 114, 255, 0.7)" }
              : {}),
          }}
          onMouseEnter={() => setHoveredButton("save")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          💾 Save Changes
        </button>

        <button
          onClick={downloadTradeHistory}
          style={{
            ...buttonStyleBase,
            backgroundColor: "#ffba00",
            color: "#fff",
            boxShadow: "0 3px 6px rgba(255, 186, 0, 0.5)",
            ...(hoveredButton === "export"
              ? { transform: "scale(1.05)", boxShadow: "0 6px 12px rgba(255, 186, 0, 0.7)" }
              : {}),
          }}
          onMouseEnter={() => setHoveredButton("export")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          📥 Export History
        </button>

        <button
          onClick={toggleDarkMode}
          style={{
            ...buttonStyleBase,
            backgroundColor: "#6f42c1",
            color: "#fff",
            boxShadow: "0 3px 6px rgba(111, 66, 193, 0.5)",
            ...(hoveredButton === "toggleDark"
              ? { transform: "scale(1.05)", boxShadow: "0 6px 12px rgba(111, 66, 193, 0.7)" }
              : {}),
          }}
          onMouseEnter={() => setHoveredButton("toggleDark")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={handleDeleteAccount}
          style={{
            ...buttonStyleBase,
            backgroundColor: "#dc3545",
            color: "#fff",
            boxShadow: "0 3px 6px rgba(220, 53, 69, 0.5)",
            ...(hoveredButton === "delete"
              ? { transform: "scale(1.05)", boxShadow: "0 6px 12px rgba(220, 53, 69, 0.7)" }
              : {}),
          }}
          onMouseEnter={() => setHoveredButton("delete")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          ⚠️ Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
