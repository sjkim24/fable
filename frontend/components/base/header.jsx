import React, { Component } from "react";
import SearchButton from "../nav_bar/search_button.jsx";
import Modal from "./modal.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/modal_toggle";
import { Link } from "react-router";

class Header extends Component {
  constructor() {
    super();
    
    this.toggleAuthModal = this.toggleAuthModal.bind(this);
  }
  
  toggleAuthModal() {
    this.props.toggleModal("auth-selections");
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
            <img src="/images/logo_yellow.png" alt="fable logo" className="header-list-logo-img"/>
          </Link>
          <ul className="header-list-right">
            <li className="header-list-auth-story-link">
              <div onClick={this.toggleAuthModal}className={`header-list-auth-link ${authLinkDisplay}`}>
                Signin / Signup
              </div>
              <a href="" className={`header-list-story-link ${storyLinkDisplay}`}>Write a story</a>
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
  return bindActionCreators({ toggleModal }, dispatch);
}

function mapStateToProps(state) {
  return { modal: state.modal }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

// new code end

// export default Header;

// add these after i can test user auth in react
// <li className="header-list-notification">Noti</li>
// <li className="header-list-profile">Prof</li>