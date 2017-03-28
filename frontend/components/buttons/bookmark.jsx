import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";
import { fetchStory } from "../../actions/story_fetch";
import { toggleModal } from "../../actions/modal_toggle";

class Bookmark extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.checkAuthThenToggle = this.checkAuthThenToggle.bind(this);
  }
  
  checkAuthThenToggle() {
    if (this.props.currentUser.id) {
      this.toggleBookmark();
    } else {
      this.props.toggleModal("auth-selections");
    }
  }
  
  toggleBookmark() {
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
  }
  
  render() {
    const bookmarkName = this.props.bookmarked ? "filled_bookmark" : "empty_bookmark";
    const bookmarkImgSrc = `/images/icons/${bookmarkName}.png`;
    
    return (
      <img 
        src={bookmarkImgSrc} 
        alt="bookmark img" 
        onClick={this.checkAuthThenToggle} 
        className={this.props.className} />
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories, fetchStory, toggleModal }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);