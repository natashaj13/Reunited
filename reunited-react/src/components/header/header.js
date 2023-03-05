import React from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../logo.png';

import './header.css';

export const Header = () => {
  const navigate = useNavigate();

  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="header">
      <NavLink to="/" className="link"><img src={logo} alt="logo" className="img"/>Reunited</NavLink>
      <div className="rightLinks">
        <NavLink to="/searchResults.js" className="link">Search</NavLink>

      {!localStorage.getItem('userID') &&
        <NavLink to="/login.js" className="link">Login</NavLink>
      }

      {localStorage.getItem('userID') &&
        <div className="dropdown">
          <NavLink to="/settings.js" className="link">Profile</NavLink>
          <div className="dropdown-content">
            <NavLink to="/settings.js" className="link" id="element">Settings</NavLink>
            <button onClick={logout} className="link" id="element">Logout</button>
          </div>
        </div>
      }

      </div>
    </div>
  )
}


    
  
    