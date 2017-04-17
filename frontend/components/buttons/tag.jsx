import React, { Component } from "react";
import { Link } from "react-router";

class Tag extends Component {
  render() {
    const classProps = this.props.className || "";
    
    return (
      <div className={`tag ${classProps}`}>
        {this.props.desc}
      </div>
    );
  }
};

// eventually wrap the tag desc around with link

export default Tag;