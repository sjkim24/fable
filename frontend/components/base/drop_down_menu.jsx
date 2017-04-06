import React, { Component } from "react";

class DropDownMenu extends Component {
  render() {
    const display = this.props.active ? "" : "hidden";
    
    return (
      <div className={`dropdown-menu dropdown-menu-${this.props.name} ${display}`}>
        drop down
      </div>
    );
  }
};

export default DropDownMenu;