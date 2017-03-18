import React, { Component } from "react";
import axios from "axios";

class AuthSelections extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.loginAsGuest = this.loginAsGuest.bind(this);
  }
  
  loginAsGuest() {
    console.log("logging in as Guest!");
    axios.post("/users/sign_in", {
      email: "guest@email.com",
      password: "hello123"
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  
  renderAuthComponent(event, selection) {
    switch(selection) {
      case "signup":
        // render signup form component
        return;
      case "signin":
        // render signin form component
        this.props.refillModal("auth-signin");
        return;
    }
  }
  
  render() {
    return (
      <div className="auth-selections">
        <div className="modal-header auth-selections-logo">
          <img 
            src="/images/logo_500_500.png" 
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
  
  componentDidMont() {
    this.setState({token: $('meta[name=csrf-token]').attr('content')})
  }
};

export default AuthSelections;