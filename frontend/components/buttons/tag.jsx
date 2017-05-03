import React, { Component } from "react";
import { Link } from "react-router";

class Tag extends Component {
  capitalizedDesc() {
    const desc = this.props.desc;
    const firstLetter = desc.split("")[0].toUpperCase();
    const rest = desc.split("").slice(1).join("");
    
    return `${firstLetter}${rest}`;
  }
  
  render() {
    const classProps = this.props.className || "";
    
    return (
      <Link to={`/?tag=${this.props.desc}`} className={`tag ${classProps}`}>
        {this.capitalizedDesc()}
      </Link>
    );
  }
};

export default Tag;