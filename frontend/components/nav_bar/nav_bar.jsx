import React, { Component } from 'react';
import NavBarLink from './nav_bar_link.jsx';

class NavBar extends Component {
  render() {
    // if signed in, text is For You
    // if not, text is Home
    // for now, i'm assigning "Home" to a variable because i'm creating
    // front end for not signed in first
    
    // give active link a class to have the font color black
    
    const homeLinkText = "Home";
    
    return(
      <nav className="nav-bar padding-side">
        <img src="/images/hamburger_menu.png" alt="hamburger menu" className="nav-bar-hamburger-menu" />
        <ul className="nav-bar-links-container">
          <NavBarLink text={homeLinkText} href="" />
          <NavBarLink text="top-stories" href="" />
          <NavBarLink text="politics" href="" />
          <NavBarLink text="technology" href="" />
          <NavBarLink text="humans" href="" />
          <NavBarLink text="culture" href="" />
          <NavBarLink text="business" href="" />
          <NavBarLink text="sports" href="" />
          <NavBarLink text="bookmarks" href="" />
        </ul>
      </nav>
    );
  }
}

export default NavBar;