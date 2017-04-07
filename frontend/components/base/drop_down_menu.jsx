import React, { Component } from "react";
import { Link } from "react-router";

class DropDownMenu extends Component {
  getHref(name) {
    switch(name) {
      case("Profile"):
        return `/users/@${this.props.username}`;
      case("Edit Tag Follows"):
        return `/users/@${this.props.username}/edit_tag_follows`;
    };
  }
  
  renderOptions() {
    const that = this;
    if (this.props.links) {
      const links = this.props.links.map((link, i) => {
        return (
          <Link 
            to={that.getHref(link)} 
            key={`user-dbm-${i}`} 
            className={`dropdown-menu-${that.props.name}-option`}>
            {link}
          </Link>
        );
      });
      
      return links;
    }
  }
  
  render() {
    const display = this.props.active ? "" : "hidden";
    
    return (
      <div className={`dropdown-menu dropdown-menu-${this.props.name} ${display} card`}>
        {this.renderOptions()}
      </div>
    );
  }
};

export default DropDownMenu;