import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useAuth } from '../../context/auth/AuthContext';
function Navbar() {
  let auth = useAuth();
  return (
    <div className={styles.container}>
      <nav>
        <Link className={styles.navHeader} to="/">
          Posts-Comments
        </Link>
        {auth.userInfo.email ? (
          <ul className={styles.navMenu}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/authors">Authors</NavLink>
            <NavLink to="/newpost">New Post</NavLink>
            <button onClick={() => auth.logout()}>Logout</button>
          </ul>
        ) : (
          <ul className={styles.navMenu}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/authors">Authors</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
