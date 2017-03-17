import React, { Component } from "react";

class SignInForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      username: "", password: "", passwordConfirm: "", error: false 
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  handleChange(event, type) {
    switch(type) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      case "password-confirm":
        this.setState({ passwordConfirm: event.target.value });
        break;
    };
  }
  
  checkPasswords() {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  }
  
  onFormSubmit(event) {
    event.preventDefault();
    // send a post request to /users/sign_in
    console.log("submit");
  }
  
  render() {
    const errorDisplay = this.state.error ? "" : "hidden";
    
    return (
      <div className="sign-in-form-container">
        <div className="modal-header sign-in-form-header">
          Enter your email address to sign in or create an account on Fable
        </div>
        <form onSubmit={this.onFormSubmit} className="sign-in-form">
          <div className="sign-in-form-input-username-container">
            <label 
              htmlFor="sign-in-input-username"
              className="sign-in-input-label">
              Email address
            </label>
            <input
              id="sign-in-input-username"
              className="sign-in-input sign-in-input-username" 
              placeholder="youremail@example.com" 
              onChange={(event) => this.handleChange(event, "username")} 
              value={this.state.username} />
          </div>
          <div className="sign-in-form-input-password-container">
            <label 
              htmlFor="sign-in-input-password"
              className="sign-in-input-label">
              Password
            </label>
            <input
              id="sign-in-input-password"
              className="sign-in-input sign-in-input-password" 
              placeholder="Please enter your password"
              type="password"
              onChange={(event) => this.handleChange(event, "password")} 
              value={this.state.password} />
          </div>
          <div className="sign-in-form-input-password-confirm-container">
            <label 
              htmlFor="sign-in-input-password-confirm"
              className="sign-in-input-label">
              Password confirmation
            </label>
            <input
              id="sign-in-input-password-confirm"
              className="sign-in-input sign-in-form-input-password" 
              placeholder="Please confirm your password"
              type="password"
              onChange={(event) => this.handleChange(event, "password-confirm")} 
              value={this.state.passwordConfirm} 
              onBlur={this.checkPasswords} />
          </div>
          <div className={`password-confirmation-error ${errorDisplay}`}>
            Please enter a matching password
          </div>
          <button type="submit" className="form-button sign-in-button">
            Sign In
          </button>
        </form>
      </div>
    );
  }
};

export default SignInForm;