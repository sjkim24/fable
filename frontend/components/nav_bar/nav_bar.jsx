import React, { Component } from "react";

import NavBarLinks from "./nav_bar_links.jsx";

class NavBar extends Component {
  constructor() {
    super()
    
    // this.state = { active: false };
    // this.toggleSlidingMenu = this.toggleSlidingMenu.bind(this);
  }
  
  toggleSlidingMenu() {
    this.setState({ active: !this.state.active });
  }
  
  render() {
    // const state = this.state.active ? "active" : "hidden";
    // console.log(this.state.active);
    return(
      <nav className="nav-bar padding-side">
        <div className="nav-bar-inner group">
          <img 
            src="/images/icons/burger_b.png" 
            alt="hamburger menu" 
            className="nav-bar-hamburger-menu" 
            onClick={this.toggleSlidingMenu}/>
          <NavBarLinks />
        </div>
      </nav>
    );
  }
};

export default NavBar;

// <div className={`sliding-menu sliding-menu-${state}`}>
//   <ul className="sliding-menu-inner">
//     <li className="sliding-menu-item">
//       <a href="">Home</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Top Stories</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Politics</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Technology</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Humans</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Culture</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Business</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Sports</a>
//     </li>
//     <li className="sliding-menu-item">
//       <a href="">Bookmark</a>
//     </li>
//   </ul>
// </div>
