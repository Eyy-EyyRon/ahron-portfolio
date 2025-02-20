import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-brand">AHRON PASADILLA</div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? "show" : ""}`}>
        <li><NavLink to="/" exact activeClassName="active" onClick={() => setIsOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/about" activeClassName="active" onClick={() => setIsOpen(false)}>About</NavLink></li>
        <li><NavLink to="/projects" activeClassName="active" onClick={() => setIsOpen(false)}>Projects</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active" onClick={() => setIsOpen(false)}>Contact</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
