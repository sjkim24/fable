import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { fetchCurrentUserResponses } from "../../actions/action_user";

class UsersCommentsIndex extends Component {
  componentWillMount() {
    this.props.fetchCurrentUserResponses();
  }
  
  render() {
    console.log(this.props.responses);
    return (
      <div>
        comments index!
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUserResponses }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser, responses: state.user.responses };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersCommentsIndex);