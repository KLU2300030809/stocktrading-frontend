import './home.css'; // Optional styling

export default function Home({ setPage, user }) {
  return (
    <div className="home-container">
      <h1 className="title">Welcome to Virtual Stock Trading!</h1>
      {user ? (
        <p className="message">Welcome back, {user.username}!</p>
      ) : (
        <p className="message">Please log in or register to begin trading.</p>
      )}
      {!user && (
        <div className="cta-buttons">
          <button onClick={() => setPage("login")}>Log In</button>
          <button onClick={() => setPage("register")}>Register</button>
        </div>
      )}
    </div>
  );
}
