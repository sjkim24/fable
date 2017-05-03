import React, { Component } from "react";
import NavBarLinksItem from "./nav_bar_links_item.jsx";

class NavBarLinks extends Component {
  render() {
    return (
      <ul className="nav-bar-links-container">
        <NavBarLinksItem text="home" href="/" />
        <NavBarLinksItem text="travel" href="/?tag=travel" />
        <NavBarLinksItem text="food" href="/?tag=food" />
        <NavBarLinksItem text="technology" href="/?tag=technology" />
        <NavBarLinksItem text="productivity" href="/?tag=productivity" />
        <NavBarLinksItem text="fashion" href="/?tag=fashion" />
        <NavBarLinksItem text="business" href="/?tag=business" />
        <NavBarLinksItem text="sports" href="/?tag=sports" />
        <NavBarLinksItem text="bookmarks" href="" />
      </ul>
    );
  }
}

export default NavBarLinks