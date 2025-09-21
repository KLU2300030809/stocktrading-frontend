import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.css';

const SITE_KEY = "6LftMTUrAAAAACFeWgWKitIr_Vz0EnHwYaP6sEub"; // Your site key

export default function Login({ users, setUser, setPage }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please verify you are not a robot.");
      return;
    }

    const found = users.find(u => u.username === form.username && u.password === form.password);

    if (found) {
      setUser(found);
      setLoggedInUser(found);
      setLoginSuccess(true);
      setLoginFailed(false);
      setPage(found.role === 'admin' ? "adminDashboard" : "home");
    } else {
      setLoginFailed(true);
      setLoginSuccess(false);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value); // true if token exists
  };

  const handleDialogClose = () => {
    setLoginSuccess(false);
    setLoginFailed(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          required
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptchaChange} />

        <button type="submit">Login</button>

        {loginSuccess && (
          <div className="success-dialog">
            <div className="success-message">
              Login Successful! Welcome {loggedInUser.username}
              <br />
              Role: {loggedInUser.role}
              <button onClick={handleDialogClose}>OK</button>
            </div>
          </div>
        )}

        {loginFailed && (
          <div className="error-dialog">
            <div className="error-message">
              Invalid credentials. Try again.
              <button onClick={handleDialogClose}>OK</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
