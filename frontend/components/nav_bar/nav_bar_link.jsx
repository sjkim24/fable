import React, { Component } from "react";

class NavBarLink extends Component {
  render() {
    const text = this.props.text.split("-").map(function(word) {
      return `${word[0].toUpperCase()}${word.slice(1)}`
    })
    console.log(text);
    return (
      <li className={`nav-bar-link nav-bar-link-${this.props.text}`}>
        <a href={this.props.href}>{text.join(" ")}</a>
      </li>
    );
  }
}

export default NavBarLink;