import './Header.css';

export default function Header({ onNavigate, isLoggedIn }) {
  return (
    <header className="header">
      <nav className="nav-bar">
       
        {isLoggedIn && (
          <>
            <button className="nav-btn" onClick={() => onNavigate("portfolio")}>Portfolio</button>
            <button className="nav-btn" onClick={() => onNavigate("stocks")}>Stocks</button>
            <button className="nav-btn" onClick={() => onNavigate("market")}>Market</button>
                 <button className="nav-btn" onClick={() => onNavigate("fno")}>F&O</button>
            <button className="nav-btn" onClick={() => onNavigate("tutorial")}>Tutorial</button>
   
            <button className="nav-btn" onClick={() => onNavigate("profile")}>Profile</button>
          </>
        )}
      </nav>
    </header>
  );
}
