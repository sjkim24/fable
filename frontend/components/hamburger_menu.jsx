import React, { Component } from "react";

class HamburgerMenu extends Component {
  render() {
    return (
      <div className="hamburger-menu">
        {this.props.children}
      </div>
    );
  }
}

export default HamburgerMenu;