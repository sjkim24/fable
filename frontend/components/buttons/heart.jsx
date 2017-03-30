import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory, fetchStories } from "../../actions/action_stories";
// import { fetchStory } from "../../actions/story_fetch";
import { fetchComment, fetchComments } from "../../actions/action_comments";
// import { fetchComment } from "../../actions/comment_fetch";
import { fetchCurrentUser } from "../../actions/action_auth";
import { toggleModal } from "../../actions/action_modal";

class Heart extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.checkAuthThenToggle = this.checkAuthThenToggle.bind(this);
  }
  
  checkAuthThenToggle() {
    if (this.props.currentUser.id) {
      this.toggleLike();
    } else {
      this.props.toggleModal("auth-selections");
    }
  }
  
  toggleLike() {
    const that = this;
    const name = this.props.name;
    let url;
    let method;
    let data;
    
    if (name === "storiesIndex" || name === "storiesShow") {
      data = { 
        story_like: { story_id: this.props.storyId },
        authenticity_token: this.state.token 
      };
      
      if (this.props.liked) {
        url = "/api/story_likes/destory";
        method = "delete";
      } else {
        url = `/api/stories/${this.props.storyId}/story_likes`;
        method = "post";
      }
    } else {
      data = {
        comment_like: { comment_id: this.props.commentId },
        authenticity_token: this.state.token
      };
      
      if (this.props.liked) {
        url = "/api/comment_likes/destroy";
        method = "delete";
      } else {
        url = `/api/comments/${this.props.commentId}/comment_likes`;
        method = "post";
      }
    }

    axios({
      method: method,
      url: url,
      data: data
    })
    .then((response) => {
      switch(name) {
        case("storiesIndex"):
          that.props.fetchStories();
          break;
        case("storiesShow"):
          that.props.fetchStory(that.props.storyId);
          break;
        case("commentsIndex"):
          that.props.fetchComments(that.props.storyId);
          break;
        case("commentsShow"):
          that.props.fetchComment(that.props.commentId)
          break;
      };
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  render() {
    console.log(this.state.token);
    const heartName = this.props.liked ? "filled_heart" : "empty_heart";
    const heartImgSrc = `/images/icons/${heartName}.png`;
    
    return (
      <img 
        src={heartImgSrc} 
        alt="heart img" 
        onClick={this.checkAuthThenToggle} 
        className={this.props.className} />
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchStories, 
    fetchStory, 
    fetchComments, 
    fetchComment, 
    fetchCurrentUser,
    toggleModal 
  }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heart);