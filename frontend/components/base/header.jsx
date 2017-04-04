import React, { Component } from "react";
import SearchButton from "../nav_bar/search_button.jsx";
import Modal from "./modal.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/action_modal";
import { Link } from "react-router";
import { setCurrentUser } from "../../actions/action_auth";

class Header extends Component {
  constructor() {
    super();
    
    this.toggleAuthModal = this.toggleAuthModal.bind(this);
  }
  
  renderStoryForm() {
    console.log("render story form clicked");
  }
  
  toggleAuthModal() {
    this.props.toggleModal("auth-selections");
  }
  
  renderAuthOrUser() {
    if (this.props.currentUser) {
      return (
        <img 
          src={this.props.currentUser.user_image_url} 
          alt="user image" 
          className="header-list-auth-user-img" />
      );
    } else {
      return (
        <div onClick={this.toggleAuthModal} className="header-list-auth-link">
          Signin / Signup
        </div>
      );
    }
  }
  
  render() {
    // if signed in display write a story
    // else display auth links
    // for now, i'll set the boolean value of signed in to a variable in render function
    const authLinkDisplay = "";
    const storyLinkDisplay = "hidden"
      
    return(
      <header className="header padding-side group">
        <div className="header-inner group">
          <Link to="/" className="header-list-left header-list-logo">
            <img src="/images/logo_small.png" alt="fable logo" className="header-list-logo-img-small" />
            <img src="/images/logo_wide.png" alt="fable logo" className="header-list-logo-img-wide" />
          </Link>
          <ul className="header-list-right">
            <li className="header-list-story-link">
              <Link to="/new-story" className="header-list-story-link-btn">
                Write a story
              </Link>
            </li>
            <li className="header-list-auth-user-container">
              {this.renderAuthOrUser()}
            </li>
            <li className="header-list-search">
              <SearchButton />
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

// new code start

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal, setCurrentUser }, dispatch);
}

function mapStateToProps(state) {
  return { modal: state.modal, currentUser: state.auth.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// new code end

// export default Header;

// add these after i can test user auth in react
// <li className="header-list-notification">Noti</li>
// <li className="header-list-profile">Prof</li>