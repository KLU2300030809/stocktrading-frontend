import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';  // Make sure Home component is imported
import Login from './components/Login';  // Example for Login
import Register from './components/Register';  // Example for Register
import Portfolio from './components/Portfolio';  // Example for Portfolio

import './styles/Home.css';  // Your Home page styles
import './styles/Header.css';  // Header styles

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // Initial page is 'home'

  const handleNavigate = (page) => {
    setCurrentPage(page);  // Update the current page state when a nav button is clicked
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'login':
        return <Login />;
      case 'register':
        return <Register />;
      case 'portfolio':
        return <Portfolio />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <Header onNavigate={handleNavigate} />
      {renderPage()}  {/* Dynamically render the page based on currentPage */}
    </div>
  );
}

export default App;
