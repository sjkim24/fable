import React, { Component } from "react";
import SearchButton from "../nav_bar/search_button.jsx";
import Modal from "./modal.jsx";

class Header extends Component {
  render() {
    // if signed in display write a story
    // else display auth links
    // for now, i'll set the boolean value of signed in to a variable in render function
    const authLinkDisplay = "";
    const storyLinkDisplay = "hidden"
    
    return(
      <header className="header padding-side group">
        <div className="header-list-left header-list-logo">
          <img src="/images/logo_500_500.png" alt="fable logo" className="header-list-logo-img"/>
        </div>
        <ul className="header-list-right">
          <li className="header-list-auth-story-link">
            <div className={`auth-link-component ${authLinkDisplay}`}>
              Signin / Signup
            </div>
            <a href="" className={`header-list-story-link ${storyLinkDisplay}`}>Write a story</a>
          </li>
          <li className="header-list-search">
            <SearchButton />
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;

// add these after i can test user auth in react
// <li className="header-list-notification">Noti</li>
// <li className="header-list-profile">Prof</li>