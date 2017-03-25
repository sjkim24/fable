import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";

class Heart extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.toggleLike = this.toggleLike.bind(this);
  }
  
  toggleLike() {
    // if current user isn't null
    const that = this;
    let url;
    let method;

    if (this.props.liked) {
      url = "/api/story_likes/destory";
      method = "delete";
    } else {
      url = `/api/stories/${this.props.storyId}/story_likes`;
      method = "post";
    }
    
    axios({
      method: method,
      url: url,
      data: { 
        story_like: { story_id: `${this.props.storyId}`},
        authenticity_token: this.state.token 
      }
    })
    .then(function(response) {
      switch(that.props.name) {
        case("storiesIndex"):
          that.props.fetchStories();
          break;
      };
    })
    .catch(function(error) {
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
  return bindActionCreators({ fetchStories }, dispatch);
};

export default connect(null, mapDispatchToProps)(Heart);