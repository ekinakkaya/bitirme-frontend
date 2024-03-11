import React, { Component } from 'react';

import './NavBar.css';

class NavBar extends Component {
  handleLogout = () => {
    window.location.href = '/login';
  };

  render() {
    return (
      <div>
        <nav className="navbar">
          <p className="navbar-brand">Başkent University Document Assistant</p>
          <div className="buttons">
            <button className="UserButtonWithImage"></button>
            <button className="LogoutButton" onClick={this.handleLogout}>Logout</button>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
