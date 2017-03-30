import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/action_stories";
import { fetchCurrentUser } from "../../actions/action_auth";

class AuthSelections extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }
  
  setCurrentUser() {
    // call set current user action
  }
  
  loginAsGuest() {
    const that = this;
    axios.post("/users/sign_in", {
      user: {
        email: "guest@email.com",
        password: "hello123"
      },
      authenticity_token: this.state.token
    })
    .then(function(response) {
      debugger
      this.setCurrentUser();
      // close modal
      that.props.toggleModal();
      // fetch current stories again with updated data on likes and bookmark
      if ($(".stories")[0]) {
        that.props.fetchStories();
      } // else if story show, fetch that story 1 more time
      
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  
  renderAuthComponent(event, selection) {
    switch(selection) {
      case "signup":
        // render signup form component
        this.props.refillModal("auth-signup");
        return;
      case "signin":
        // render signin form component
        return;
    }
  }
  
  render() {
    return (
      <div className="auth-selections">
        <div className="modal-header auth-selections-logo">
          <img 
            src="/images/logo_long.png" 
            alt="fable logo" 
            className="auth-selections-logo-img" />
        </div>
        <div className="auth-selections-desc">Sign in to Fable to connect with voices and perspectives that matter.</div>
        <ul className="auth-selections-btns-container">
          <li 
            className="auth-selections-btn auth-selections-btn-guest" 
            onClick={this.loginAsGuest}>
            Sign in as Guest
          </li>
          <li 
            className="auth-selections-btn auth-selections-btn-signin" 
            onClick={(event) => this.renderAuthComponent(event, "signin")}>
            Sign in with Email
          </li>
          <li 
            className="auth-selections-link auth-selections-link-signup" 
            onClick={(event) => this.renderAuthComponent(event, "signup")}>
            Sign up with email
          </li>
        </ul>
        <div className="auth-selections-footer">If you don't have an acocunt, you can click on the "Sign in as Guest" button</div>
      </div>
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories, fetchCurrentUser }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSelections);