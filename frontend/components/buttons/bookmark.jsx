import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/action_user";
import { fetchStory, fetchStories } from "../../actions/action_stories";
import { toggleModal } from "../../actions/action_modal";

class Bookmark extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.checkAuthThenToggle = this.checkAuthThenToggle.bind(this);
  }
  
  checkAuthThenToggle() {
    if (this.props.currentUser) {
      this.setState({ token: $('meta[name=csrf-token]').attr('content') }, () => {
        this.toggleBookmark();
      });
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
        case("usersProfile"):
          that.props.fetchUser(that.props.username);
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
  return bindActionCreators({ 
    fetchStories, fetchStory, toggleModal, fetchUser 
  }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark);