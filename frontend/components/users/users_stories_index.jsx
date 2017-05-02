import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { fetchCurrentUserStories } from "../../actions/action_user";
import UsersStoriesIndexItem from "./users_stories_index_item.jsx";

class UsersStoriesIndex extends Component {
  constructor() {
    super();
    
    this.state = {
      active: false,
      activeKey: null 
    };
  }
  
  renderStoriesIndexItems() {
    const stories = this.props.userStories.map((story, i) => {
      return (
        <UsersStoriesIndexItem
          username={this.props.currentUser.username} 
          story={story} 
          key={`user-story-${i}`} />
      );
    });
    
    return stories;
  }
  
  componentWillMount() {
    this.props.fetchCurrentUserStories();
  }
  
  render() {
    if (!this.props.currentUser || !this.props.userStories) {
      return <div className="loader" />;
    } 
    
    return (
      <div className="user-stories padding-side">
        <div className="user-stories-header">Your stories</div>
        {this.renderStoriesIndexItems()}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUserStories }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser, userStories: state.user.stories };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersStoriesIndex);