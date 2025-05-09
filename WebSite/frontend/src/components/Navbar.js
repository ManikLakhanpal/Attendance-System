import React from 'react';
import { FaUser, FaClipboardList, FaUserCheck } from 'react-icons/fa';

const Navbar = ({ onNavbarClick }) => {
  return (
    <div className="navbar">
      <div className="logo">
        Admin Dashboard
      </div>
      <div className="navbar-options">
        <div 
          className="navbar-option" 
          onClick={() => onNavbarClick('dashboard')}
        >
          <FaUser /> Welcome
        </div>
        <div 
          className="navbar-option" 
          onClick={() => onNavbarClick('attendance')}
        >
          <FaClipboardList /> Attendance
        </div>
        <div 
          className="navbar-option" 
          onClick={() => onNavbarClick('proxies')}
        >
          <FaUserCheck /> Proxy
        </div>
      </div>
    </div>
  );
};

export default Navbar;
