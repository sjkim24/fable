import React, { Component } from "react";

import NavBarLinks from "./nav_bar_links.jsx";
// import HamburgerMenu from "../hamburger_menu.jsx";

class NavBar extends Component {
  render() {
    // give active link a class to have the font color black

    return(
      <nav className="nav-bar padding-side">
        <div className="nav-bar-inner group">
          <img src="/images/icons/hamburger_menu.png" alt="hamburger menu" className="nav-bar-hamburger-menu" />
          <NavBarLinks />
        </div>
      </nav>
    );
  }
}

export default NavBar;