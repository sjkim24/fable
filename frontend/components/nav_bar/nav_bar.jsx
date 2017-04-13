import React, { Component } from "react";
import NavBarLinks from "./nav_bar_links.jsx";

class NavBar extends Component {
  render() {
    return(
      <nav className="nav-bar padding-side">
        <div className="nav-bar-inner group">
          <img 
            src="/images/icons/burger_b.png" 
            alt="hamburger menu" 
            className="nav-bar-hamburger-menu" 
            onClick={this.props.toggleSlidingMenu}/>
          <NavBarLinks />
        </div>
      </nav>
    );
  }
};

export default NavBar;