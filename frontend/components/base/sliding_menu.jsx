import React, { Component } from "react";

class SlidingMenu extends Component {
  render() {
    const state = this.props.active ? "active" : "hidden";
    
    return (
      <div className={`sliding-menu sliding-menu-${state}`}>
        <div className="sliding-menu-header">Stories of Fable</div>
        <ul className="sliding-menu-inner">
          <li className="sliding-menu-item">
            <a href="">Home</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Top Stories</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Politics</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Technology</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Humans</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Culture</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Business</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Sports</a>
          </li>
          <li className="sliding-menu-item">
            <a href="">Bookmark</a>
          </li>
        </ul>
      </div>
    );
  }
};

export default SlidingMenu;