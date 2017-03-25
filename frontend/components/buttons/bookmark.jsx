import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";
import { fetchStory } from "../../actions/story_fetch";

class Bookmark extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }
  
  toggleBookmark() {
    // if current user isn't null
    const that = this;
    let url;
    let method;

    if (this.props.bookmarked) {
      url = "/api/bookmarks/destory";
      method = "delete";
    } else {
      url = `/api/stories/${this.props.storyId}/bookmarks`;
      method = "post";
    }
    
    axios({
      method: method,
      url: url,
      data: { 
        bookmark: { story_id: this.props.storyId },
        authenticity_token: this.state.token 
      }
    })
    .then((response) => {
      switch(that.props.name) {
        case("storiesIndex"):
          that.props.fetchStories();
          break;
        case("storiesShow"):
          that.props.fetchStory(that.props.storyId);
          break;
      };
    })
    .catch((error) => {
      console.log(error);
    });
    // else render login form
  }
  
  render() {
    const bookmarkName = this.props.bookmarked ? "filled_bookmark" : "empty_bookmark";
    const bookmarkImgSrc = `/images/icons/${bookmarkName}.png`;
    
    return (
      <img 
        src={bookmarkImgSrc} 
        alt="bookmark img" 
        onClick={this.toggleBookmark} 
        className={this.props.className} />
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories, fetchStory }, dispatch);
};

export default connect(null, mapDispatchToProps)(Bookmark);