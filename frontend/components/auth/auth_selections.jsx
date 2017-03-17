// copy paste
import React, { Component } from "react";

class AuthSelections extends Component {
  renderAuthComponent(event, selection) {
    console.log(selection)
    switch(selection) {
      case "guest":
        // send a session post request to sign in with guest account
        return;
      case "signup":
        // render signup form component
        return;
      case "signin":
        // render signin form component
        this.props.refillModal("auth-signin")
        return;
    }
  }
  
  render() {
    return (
      <div className="auth-selections">
        <div className="auth-selections-logo">
          <img 
            src="/images/logo_500_500.png" 
            alt="fable logo" 
            className="auth-selections-logo-img" />
        </div>
        <div className="auth-selections-header">Sign in to Fable to connect with voices and perspectives that matter.</div>
        <ul className="auth-selections-btns-container">
          <li 
            className="auth-selections-btn auth-selections-btn-guest" 
            onClick={(event) => this.renderAuthComponent(event, "guest")}>
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

export default AuthSelections;