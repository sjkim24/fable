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
    debugger
    // use axios to send a post rquest
    // $.ajax({
    //     method: "POST",
    //     url: "/users.json",
    //     data: {
    //       user: {
    //         email: this.state.email,
    //         password: this.state.password,
    //         fullname: this.state.fullname,
    //         username: this.state.username
    //       },
    //       authenticity_token: Functions.getMetaContent("csrf-token")
    //     }
    //   })
    //   .done(function(data){
    //     debugger
    //     // location.reload();
    //   }.bind(this));
  }
  
  render() {
    const errorDisplay = this.state.error ? "" : "hidden";

    return (
      <div className="auth-form-container">
        <div className="modal-header auth-form-header">
          Enter your information to create an account on Fable
        </div>
        <form onSubmit={this.onFormSubmit} className="auth-form">
          <div className="auth-form-input-email-container">
            <label 
              htmlFor="auth-input-email"
              className="auth-input-label">
              Email address
            </label>
            <input
              id="auth-input-username"
              className="auth-input auth-input-email" 
              placeholder="youremail@example.com" 
              onChange={(event) => this.handleChange(event, "email")} 
              value={this.state.email} />
          </div>
          <div className="auth-form-input-fullname-container">
            <label 
              htmlFor="auth-input-fullname"
              className="auth-input-label">
              Full Name
            </label>
            <input
              id="auth-input-fullname"
              className="auth-input auth-input-fullname" 
              placeholder="Enter your real name" 
              onChange={(event) => this.handleChange(event, "full-name")} 
              value={this.state.fullname} />
          </div>
          <div className="auth-form-input-username-container">
            <label 
              htmlFor="auth-input-username"
              className="auth-input-label">
              Username
            </label>
            <input
              id="auth-input-username"
              className="auth-input auth-input-username" 
              placeholder="Enter your cool name" 
              onChange={(event) => this.handleChange(event, "username")} 
              value={this.state.username} />
          </div>
          <div className="auth-form-input-password-container">
            <label 
              htmlFor="auth-input-password"
              className="auth-input-label">
              Password
            </label>
            <input
              id="auth-input-password"
              className="auth-input auth-input-password" 
              placeholder="Please enter your password"
              type="password"
              onChange={(event) => this.handleChange(event, "password")} 
              value={this.state.password} />
          </div>
          <div className="auth-form-input-password-confirm-container">
            <label 
              htmlFor="auth-input-password-confirm"
              className="auth-input-label">
              Password confirmation
            </label>
            <input
              id="auth-input-password-confirm"
              className="auth-input auth-form-input-password" 
              placeholder="Please confirm your password"
              type="password"
              onChange={(event) => this.handleChange(event, "password-confirm")} 
              value={this.state.passwordConfirm} 
              onBlur={this.checkPasswords} />
          </div>
          <div className={`password-confirmation-error ${errorDisplay}`}>
            Please enter a matching password
          </div>
          <button type="submit" className="form-button auth-button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
};

export default SignUpForm;