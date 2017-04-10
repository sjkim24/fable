import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/action_stories";
import { setCurrentUser, setAuthToken } from "../../actions/action_auth";

class SignInForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      email: "",
      password: "", 
      error: false 
    };
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  handleChange(event, type) {
    switch(type) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
    };
  }
  
  onFormSubmit(event) {
    event.preventDefault();
    const that = this;
    
    axios.post("/users/sign_in", {
      user: {
        email: this.state.email,
        password: this.state.password
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
      console.log(error);
    });
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
          <button type="submit" className="form-button auth-button">
            Sign In
          </button>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);