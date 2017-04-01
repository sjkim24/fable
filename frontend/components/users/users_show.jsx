import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/action_user";

class UsersShow extends Component {
  componentWillMount() {
    this.props.fetchUser(this.props.params.username);
  }
  
  render() {
    console.log(this.props.user);
    return (
      <div>User Show!</div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
};

function mapStateToProps(state) {
  return { user: state.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersShow);