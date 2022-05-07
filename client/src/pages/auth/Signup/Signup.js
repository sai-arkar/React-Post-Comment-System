import React, { useState } from 'react';
import { useAuth } from '../../../context/auth/AuthContext';

import styles from './Signup.module.css';
function Signup() {
  //consume provided user data
  const auth = useAuth();
  const initialState = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
  };
  const [fill, setFill] = useState(false);
  const [user, setUser] = useState(initialState);
  const [errorMsg, setErrorMsg] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (
      user.name.trim().length > 0 &&
      user.email.trim().length > 0 &&
      user.password.trim().length > 0 &&
      user.cpassword.trim().length > 0
    ) {
      setFill(false);
    } else {
      setFill(true);
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (user.password.trim() !== user.cpassword.trim()) {
      setUser({ ...user, errorMsg: 'Password Not Match' });
    } else if (fill) {
      setErrorMsg('Fills all fileds');
    } else {
      auth.signup(user);
      setUser(initialState);
    }
  };
  return (
    <div className={styles.container}>
      {errorMsg && (
        <h3
          style={{ color: '#e9023c', padding: '20px', background: 'lightgrey' }}
        >
          {errorMsg}
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
        className={styles.signupForm}
        autoComplete="off"
        onSubmit={handleSignup}
      >
        <span className={styles.header}>Sign Up</span>
        <div className={styles.formControl}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={user.email}
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
        <div className={styles.formControl}>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm your password"
            value={user.cpassword}
            onChange={handleChange}
          />
        </div>

        <button disabled={fill}>Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
