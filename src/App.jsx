import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Stocks from "./components/Stocks";
import Portfolio from "./components/Portfolio";
import Register from "./components/Register";
import Login from "./components/Login";
import Market from "./components/Market";
import Tutorial from "./components/Tutorial";
import UserProfile from "./components/UserProfile";
import Chatbot from "./components/Chatbot";
import FnO from "./components/FnO"; // ✅ Import FnO Component
import Watchlist from "./components/Watchlist"; // ✅ Import Watchlist Component

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Dark Mode State

  useEffect(() => {
    // Check localStorage for dark mode preference
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
    }

    // Fetch user portfolio and watchlist if logged in
    if (user) {
      const storedPortfolio = JSON.parse(localStorage.getItem(user.username)) || [];
      setPortfolio(storedPortfolio);

      const storedWatchlist = JSON.parse(localStorage.getItem(`${user.username}_watchlist`)) || [];
      setWatchlist(storedWatchlist);
    } else {
      setPortfolio([]);
      setWatchlist([]);
    }
  }, [user]);

  const updatePortfolio = (updatedPortfolio) => {
    setPortfolio(updatedPortfolio);
    if (user) {
      localStorage.setItem(user.username, JSON.stringify(updatedPortfolio));
    }
  };

  const updateWatchlist = (updatedWatchlist) => {
    setWatchlist(updatedWatchlist);
    if (user) {
      localStorage.setItem(`${user.username}_watchlist`, JSON.stringify(updatedWatchlist));
    }
  };

  const handleLogout = () => {
    setUser(null);
    setPage("home");
    localStorage.removeItem(user?.username);
    localStorage.removeItem(`${user?.username}_watchlist`);
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem(updatedUser.username, JSON.stringify(updatedUser));
  };

  const handleChatMessage = (message) => {
    console.log("User message:", message);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <div className="app-container">
      <Header onNavigate={setPage} isLoggedIn={!!user} onLogout={handleLogout} />

      {page === "home" && <Home setPage={setPage} user={user} />}
      {page === "register" && <Register users={users} setUsers={setUsers} setPage={setPage} />}
      {page === "login" && <Login users={users} setUser={setUser} setPage={setPage} />}
      {page === "tutorial" && <Tutorial />}
      {page === "profile" && user && (
        <UserProfile user={user} setUser={updateUserProfile} toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      )}
      {page === "market" && user && <Market />}
      {page === "stocks" && user && (
        <Stocks updatePortfolio={updatePortfolio} updateWatchlist={updateWatchlist} watchlist={watchlist} />
      )}
      {page === "portfolio" && user && <Portfolio portfolio={portfolio} updatePortfolio={updatePortfolio} />}
      {page === "watchlist" && user && (
        <Watchlist watchlist={watchlist} updateWatchlist={updateWatchlist} />
      )}
      {page === "fno" && user && <FnO />} {/* ✅ Add F&O page condition */}

      {/* Show message for logged-out users trying to access pages */}
      {(page === "portfolio" || page === "stocks" || page === "market" || page === "profile" || page === "fno" || page === "watchlist") && !user && (
        <p style={{ padding: "20px" }}>Please log in to view this page.</p>
      )}

      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {showChatbot ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {showChatbot && <Chatbot onSendMessage={handleChatMessage} />}
    </div>
  );
}

export default App;
