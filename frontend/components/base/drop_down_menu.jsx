import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { signOutUser, setAuthToken } from "../../actions/action_auth";
import { 
  deleteCurrentUserStory, fetchStories, deleteCurrentUserResponse, fetchCurrentUserResponses 
} from "../../actions/action_user";


class DropDownMenu extends Component {
  constructor() {
    super();
    
    this.handleSignOut = this.handleSignOut.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }
  
  getHref(name) {
    switch(name) {
      case("Profile"):
        return `/users/@${this.props.username}`;
      case("Tag Follows"):
        return `/users/me/edit_tag_follows`;
      case("My Stories"):
        return "/users/me/my_stories";
      case ("My Responses"):
        return "/users/me/my_responses";
      case ("Edit Story"):
        return `/stories/${this.props.storyId}/edit`;
      case ("Edit Response"):
        return `/comments/${this.props.commentId}/edit`;
    };
  }
  
  handleSignOut(event) {
    event.preventDefault();
    this.props.signOutUser(this.props.token)
    .then(function(response) {
      $('meta[name="csrf-token"]').attr('content', response.payload.data.csrfToken);
      this.props.setAuthToken(response.payload.data.csrfToken);
    }.bind(this));
  }
  
  deleteStory(event) {
    event.preventDefault();
    this.props.deleteCurrentUserStory(this.props.storyId, this.props.token)
    .then(function(response) {
      this.props.fetchStories(this.props.currentUser.username);
    }.bind(this));
  }
  
  deleteComment(event) {
    event.preventDefault();
    this.props.deleteCurrentUserResponse(this.props.commentId, this.props.token)
    .then(function(response) {
      this.props.fetchCurrentUserResponses();
    }.bind(this));
  }
  
  renderOptions() {
    const that = this;
    if (this.props.links) {
      const links = this.props.links.map((link, i) => {
        if (link === "Sign Out") {
          return (
            <a 
              href="#"
              onClick={this.handleSignOut}
              key={`user-dbm-${i}`}
              className={`dropdown-menu-${that.props.name}-option`}>
              Sign Out
            </a>
          );
        } else if (link === "Delete Story") {
          return (
            <a
              href="#"
              key={`user-dbm-${i}`}
              onClick={this.deleteStory}
              className={`dropdown-menu-${that.props.name}-option`}>
              Delete Story
            </a>
          );
        } else if (link === "Delete Response") {
          return (
            <a
              href="#"
              key={`user-dbm-${i}`}
              onClick={this.deleteComment}
              className={`dropdown-menu-${that.props.name}-option`}>
              Delete Response
            </a>
          );
        }
         
        return (
          <Link 
            to={that.getHref(link)} 
            key={`user-dbm-${i}`} 
            className={`dropdown-menu-${that.props.name}-option`}>
            {link}
          </Link>
        );
      });
      
      return links;
    }
  }
  
  render() {
    const display = this.props.active ? "" : "hidden";
    
    return (
      <div className={`dropdown-menu dropdown-menu-${this.props.name} ${display} card`}>
        {this.renderOptions()}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    signOutUser, setAuthToken, deleteCurrentUserStory, 
    fetchStories, deleteCurrentUserResponse, fetchCurrentUserResponses 
  }, dispatch);
};

function mapStateToProps(state) {
  return { token: state.auth.authToken, currentUser: state.auth.currentUser }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu);