import React, { useState } from 'react';
import { useAuth } from '../../../context/auth/AuthContext';
import styles from './Login.module.css';
function Login() {
  const auth = useAuth();
  const initialState = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth.login(user);
  };
  return (
    <div className={styles.container}>
      {auth.successMsg && (
        <h3
          style={{ color: '#32CD32', padding: '20px', background: '#F0FFF0' }}
        >
          {auth.successMsg}
        </h3>
      )}
      {auth.errorMsg && (
        <h3
          style={{ color: '#e9023c', padding: '20px', background: 'lightgrey' }}
        >
          {auth.errorMsg}
        </h3>
      )}
      <form
        action=""
        className={styles.loginForm}
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <span className={styles.header}>Login</span>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
