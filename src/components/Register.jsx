import { useState, useEffect } from 'react';
import './register.css';

export default function Register({ users, setUsers, setPage }) {
  const [form, setForm] = useState({ username: '', password: '', email: '' });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        setRegistrationSuccess(false);
        setPage("login");
      }, 3000);
    }
  }, [registrationSuccess, setPage]);

  const validateForm = () => {
    const username = form.username.trim();
    const password = form.password;
    const email = form.email.trim();

    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!usernameRegex.test(username)) {
      setError("Username must be at least 4 characters and alphanumeric only.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError('');
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const username = form.username.trim();
    const password = form.password;
    const email = form.email.trim();
    const userArray = Array.isArray(users) ? users : [];

    if (!validateForm()) return;

    const existingUser = userArray.find(
      u => u.username.toLowerCase() === username.toLowerCase()
    );
    if (existingUser) {
      setError("Username already exists.");
      return;
    }

    setUsers([...userArray, { username, password, email }]);
    setRegistrationSuccess(true);
    setForm({ username: '', password: '', email: '' });
    setError('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        {error && <div className="error-message">{error}</div>}

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => setPage("login")} className="link-text">
            Login
          </span>
        </p>

        {registrationSuccess && (
          <div className="success-dialog">
            <div className="success-message">
              Registration Successful! Redirecting to login...
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
