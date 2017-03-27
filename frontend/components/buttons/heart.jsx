import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";
import { fetchStory } from "../../actions/story_fetch";
import { fetchComments } from "../../actions/comments_fetch";

class Heart extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.toggleLike = this.toggleLike.bind(this);
  }
  
  toggleLike() {
    // if current user isn't null
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
      };
    })
    .catch((error) => {
      console.log(error);
    });
    // else render login form
  }
  
  render() {
    const heartName = this.props.liked ? "filled_heart" : "empty_heart";
    const heartImgSrc = `/images/icons/${heartName}.png`;
    
    return (
      <img 
        src={heartImgSrc} 
        alt="heart img" 
        onClick={this.toggleLike} 
        className={this.props.className} />
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories, fetchStory, fetchComments }, dispatch);
};

// export default Heart;
export default connect(null, mapDispatchToProps)(Heart);