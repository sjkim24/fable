import React, { Component } from "react";
import { Link } from "react-router";

class DropDownMenu extends Component {
  getHref(name) {
    switch(name) {
      case("profile"):
        return `/users/@${this.props.username}`;
      case("edit-tag-follows"):
        return `/users/@${this.props.username}/edit_tag_follows`;
    };
  }
  
  renderOptions() {
    const that = this;
    if (this.props.links) {
      const links = this.props.links.map((link, i) => {
        let linkText = link.split("-");
        linkText = linkText[0].toUpperCase() + linkText.slice(1);
        return (
          <Link to={that.getHref(link)} key={`user-dbm-${i}`}>
            {linkText}
          </Link>
        );
      });
      
      return links;
    }
  }
  
  render() {
    const display = this.props.active ? "" : "hidden";
    
    return (
      <div className={`dropdown-menu dropdown-menu-${this.props.name} ${display}`}>
        {this.renderOptions()}
      </div>
    );
  }
};

export default DropDownMenu;