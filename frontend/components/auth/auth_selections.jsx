import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/action_stories";
import { setCurrentUser, setAuthToken } from "../../actions/action_auth";

class AuthSelections extends Component {
  constructor() {
    super();
    
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }
  
  loginAsGuest() {
    const that = this;
    
    axios.post("/users/sign_in", {
      user: {
        email: "guest@email.com",
        password: "hello123"
      },
      authenticity_token: this.props.token
    })
    .then(function(response) {
      that.props.setAuthToken(response.data.csrfToken);
      $('meta[name="csrf-token"]').attr('content', response.data.csrfToken);
      that.props.setCurrentUser(response.data.current_user);
      that.props.toggleModal();
      // figure out a better way to handle this later
      // fetch current stories again with updated data on likes and bookmark
      // if user logged in at index
      if ($(".stories")[0]) {
        that.props.fetchStories();
      } // else if story show, fetch that story 1 more time
      // other sitches to fetch stuff
      // comment show, reply show?, each user profile tab
      
    })
    .catch(function(error) {
      debugger
      console.log(error);
    });
  }
  
  renderAuthComponent(event, selection) {
    switch(selection) {
      case "signup":
        this.props.refillModal("auth-signup");
        return;
      case "signin":
        this.props.refillModal("auth-signin");
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
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories, setCurrentUser, setAuthToken }, dispatch);
};

function mapStateToProps(state) {
  return { token: state.auth.authToken }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthSelections);