import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory } from "../../actions/story_fetch";
import { fetchComment } from "../../actions/comment_fetch";

class Follow extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.toggleFollow = this.toggleFollow.bind(this);
  }
  
  toggleFollow() {
    // if current user isn't null
    const that = this;
    const name = this.props.name;
    let url;
    let method;    
    
    if (this.props.following) {
      url = "/api/follows/destroy";
      method = "delete";
    } else {
      url = `/api/users/${this.props.userId}/follows`;
      method = "post";
    }
    
    axios({
      method: method,
      url: url,
      data: {
        user: { user_id: this.props.userId },
        authenticity_token: this.state.token
      }
    })
    .then((response) => {
      switch(name) {
        case("storiesShow"):
          that.props.fetchStory(that.props.storyId);
          break;
        case("commentsShow"):
          that.props.fetchComment(that.props.commentId);
          break;
      };
    })
    .catch((error) => {
      console.log(error);
    });
    // else render login form
  }
  
  render() {
    const classProps = this.props.className || "";
    const follow = this.props.following ? "Unfollow" : "Follow";
    
    return (
      <div
        className={`follow-btn ${this.props.className}`} 
        onClick={this.toggleFollow}>
        {follow}
      </div>
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStory, fetchComment }, dispatch);
};

export default connect(null, mapDispatchToProps)(Follow);