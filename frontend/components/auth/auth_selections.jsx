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
        return;
    }
  }
  
  render() {
    return (
      <div>
        <div>Sign in to Fable to connect with voices and perspectives that matter.</div>
        <ul>
          <li onClick={(event) => this.renderAuthComponent(event, "guest")}>sign in as guest</li>
          <li onClick={(event) => this.renderAuthComponent(event, "signup")}>sign up</li>
          <li onClick={(event) => this.renderAuthComponent(event, "signin")}>sign in</li>
        </ul>
        <div>To use Fable you must have cookies enabled.</div>
      </div>
    );
  }
};

export default AuthSelections;