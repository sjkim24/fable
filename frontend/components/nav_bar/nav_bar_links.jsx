import React, { Component } from "react";
import NavBarLinksItem from "./nav_bar_links_item.jsx";

class NavBarLinks extends Component {
  render() {
    // if signed in, text is For You
    // if not, text is Home
    // for now, i'm assigning "Home" to a variable because i'm creating
    // front end for not signed in first
    const homeLinkText = "Home";
    
    return (
      <ul className="nav-bar-links-container">
        <NavBarLinksItem text={homeLinkText} href="" />
        <NavBarLinksItem text="top-stories" href="" />
        <NavBarLinksItem text="politics" href="" />
        <NavBarLinksItem text="technology" href="" />
        <NavBarLinksItem text="humans" href="" />
        <NavBarLinksItem text="culture" href="" />
        <NavBarLinksItem text="business" href="" />
        <NavBarLinksItem text="sports" href="" />
        <NavBarLinksItem text="bookmarks" href="" />
      </ul>
    );
  }
}

export default NavBarLinks