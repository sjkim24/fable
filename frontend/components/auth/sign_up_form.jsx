import React, { Component } from "react";

class SignUpForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      email: "",
      fullname: "",
      username: "", 
      password: "", 
      passwordConfirm: "", 
      error: false 
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  handleChange(event, type) {
    switch(type) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "full-name":
        this.setState({ fullname: event.target.value });
        break;
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
    $.ajax({
        method: "POST",
        url: "/users.json",
        data: {
          user: {
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            username: this.state.username
          },
          authenticity_token: Functions.getMetaContent("csrf-token")
        }
      })
      .done(function(data){
        debugger
        location.reload();
      }.bind(this));
    console.log("submit");
  }
  
  render() {
    const errorDisplay = this.state.error ? "" : "hidden";
    
    return (
      <div className="sign-up-form-container">
        <div className="modal-header sign-up-form-header">
          Enter your information to create an account on Fable
        </div>
        <form onSubmit={this.onFormSubmit} className="sign-up-form">
          <div className="sign-up-form-input-email-container">
            <label 
              htmlFor="sign-up-input-email"
              className="sign-up-input-label">
              Email address
            </label>
            <input
              id="sign-up-input-username"
              className="sign-up-input sign-up-input-email" 
              placeholder="youremail@example.com" 
              onChange={(event) => this.handleChange(event, "email")} 
              value={this.state.email} />
          </div>
          <div className="sign-up-form-input-fullname-container">
            <label 
              htmlFor="sign-up-input-fullname"
              className="sign-up-input-label">
              Full Name
            </label>
            <input
              id="sign-up-input-fullname"
              className="sign-up-input sign-up-input-fullname" 
              placeholder="Enter your real name" 
              onChange={(event) => this.handleChange(event, "full-name")} 
              value={this.state.fullname} />
          </div>
          <div className="sign-up-form-input-username-container">
            <label 
              htmlFor="sign-up-input-username"
              className="sign-up-input-label">
              Username
            </label>
            <input
              id="sign-up-input-username"
              className="sign-up-input sign-up-input-username" 
              placeholder="Enter your cool name" 
              onChange={(event) => this.handleChange(event, "username")} 
              value={this.state.username} />
          </div>
          <div className="sign-up-form-input-password-container">
            <label 
              htmlFor="sign-up-input-password"
              className="sign-up-input-label">
              Password
            </label>
            <input
              id="sign-up-input-password"
              className="sign-up-input sign-up-input-password" 
              placeholder="Please enter your password"
              type="password"
              onChange={(event) => this.handleChange(event, "password")} 
              value={this.state.password} />
          </div>
          <div className="sign-up-form-input-password-confirm-container">
            <label 
              htmlFor="sign-up-input-password-confirm"
              className="sign-up-input-label">
              Password confirmation
            </label>
            <input
              id="sign-up-input-password-confirm"
              className="sign-up-input sign-up-form-input-password" 
              placeholder="Please confirm your password"
              type="password"
              onChange={(event) => this.handleChange(event, "password-confirm")} 
              value={this.state.passwordConfirm} 
              onBlur={this.checkPasswords} />
          </div>
          <div className={`password-confirmation-error ${errorDisplay}`}>
            Please enter a matching password
          </div>
          <button type="submit" className="form-button sign-up-button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
};

export default SignUpForm;