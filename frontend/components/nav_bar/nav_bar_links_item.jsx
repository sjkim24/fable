import React, { Component } from "react";

class NavBarLinksItem extends Component {
  render() {
    const text = this.props.text.split("-").map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    }).join(" ");
    
    return (
      <li className={`nav-bar-link nav-bar-link-${this.props.text}`}>
        <a href={this.props.href}>{text}</a>
      </li>
    );
  }
}

export default NavBarLinksItem;