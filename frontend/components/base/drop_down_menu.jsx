import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { signOutUser } from "../../actions/action_auth";


class DropDownMenu extends Component {
  constructor() {
    super();
    
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  
  getHref(name) {
    switch(name) {
      case("Profile"):
        return `/users/@${this.props.username}`;
      case("Edit Tag Follows"):
        return `/users/@${this.props.username}/edit_tag_follows`;
    };
  }
  
  handleSignOut(event) {
    event.preventDefault();
    this.props.signOutUser(this.props.token);
  }
  
  renderOptions() {
    const that = this;
    if (this.props.links) {
      const links = this.props.links.map((link, i) => {
        if (link === "Sign Out") {
          return (
            <a 
              href="#"
              onClick={this.handleSignOut}
              key={`user-dbm-${i}`}
              className={`dropdown-menu-${that.props.name}-option`}>
              Sign Out
            </a>
          );
        }
         
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signOutUser }, dispatch);
};

function mapStateToProps(state) {
  return { token: state.auth.authToken }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu);