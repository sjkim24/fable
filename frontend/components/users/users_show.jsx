import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { fetchUser } from "../../actions/user_fetch";

class UsersShow extends Component {
  render() {
    console.log("user show");
    return (
      <div>User Show!</div>
    );
  }
}

export default UsersShow;