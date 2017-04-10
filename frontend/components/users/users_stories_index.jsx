import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { fetchStories } from "../../actions/action_user";
import UsersStoriesIndexItem from "./users_stories_index_item.jsx";

class UsersStoriesIndex extends Component {
  renderStoriesIndexItem() {
    const stories = this.props.stories.map((story, i) => {
      return (
        <UsersStoriesIndexItem 
          story={story} 
          key={`user-story-${i}`} />
      );
    });
    
    return stories;
  }
  
  render() {
    return (
      <div className="user-stories padding-side">
        <div className="user-stories-header">Your stories</div>
        {this.renderStoriesIndexItem()}
      </div>
    );
  }
  
  componentDidMount() {
    // debugger
    this.props.fetchStories(this.props.params.username);
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories }, dispatch);
};

function mapStateToProps(state) {
  return { user: state.auth.currentUser, stories: state.user.stories }
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersStoriesIndex);