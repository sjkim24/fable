import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { fetchCurrentUserResponses } from "../../actions/action_user";
import UsersCommentsIndexItem from "./users_comments_index_item.jsx";

class UsersCommentsIndex extends Component {
  componentWillMount() {
    this.props.fetchCurrentUserResponses();
  }
  
  renderCommentsIndexItems() {
    debugger
    const comments = this.props.responses.map((comment, i) => {
      return (
        <UsersCommentsIndexItem 
          username={this.props.currentUser.username} 
          comment={comment}
          key={`user-comment-${i}`} />
      );
    });
    
    return comments;
  }
  
  render() {
    if (!this.props.currentUser || !this.props.responses) {
      return <div className="loader" />;
    }
    debugger
    return (
      <div className="users-comments padding-side">
        <div className="users-comments-header">Your responses</div>
        {this.renderCommentsIndexItems()}
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