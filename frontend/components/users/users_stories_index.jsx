import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { fetchStories } from "../../actions/action_user";
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
    const stories = this.props.stories.map((story, i) => {
      return (
        <UsersStoriesIndexItem
          username={this.props.currentUser.username} 
          story={story} 
          key={`user-story-${i}`} />
      );
    });
    
    return stories;
  }
  
  render() {
    if (!this.props.currentUser || !this.props.stories) {
      return <div className="loader" />;
    } 
    
    return (
      <div className="user-stories padding-side">
        <div className="user-stories-header">Your stories</div>
        {this.renderStoriesIndexItems()}
      </div>
    );
  }
  
  componentDidMount() {
    this.props.fetchStories();
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser, stories: state.user.stories };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersStoriesIndex);