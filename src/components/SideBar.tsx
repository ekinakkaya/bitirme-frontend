import { Component } from "react";
import "./SideBar.css";

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <button className="sidebar-button">Staj Raporu</button>
          <button className="sidebar-button">Bitirme Raporu 1</button>
          <button className="sidebar-button">Bitirme Raporu 2</button>
          {}
        </div>
        <img className="main_img" src="public/main_img.png" alt="Login_Icon" />
      </div>
    );
  }
}

export default SideBar;
