import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/action_stories";
import StoriesIndexItem from "./stories_index_item.jsx";
import RecsIndex from "../recommendations/recs_index.jsx";

class StoriesIndex extends Component {
  componentWillMount() {
    this.props.fetchStories();
  }
  
  renderStories() {
    const stories = this.props.stories.stories.map((story, i) => {
      return <StoriesIndexItem key={`story-${i}`} story={story} />
    });
    
    return stories;
  }
  
  renderRecommendations() {
    return (
      <RecsIndex
        currentUser={this.props.currentUser}
        topLikedStories={this.props.stories.top_liked_stories} 
        topBookmarkedStories={this.props.stories.top_bookmarked_stories} />
    );
  }
  
  render() {
    if (!this.props.stories || !this.props.stories.stories) {
      return <div className="loader" />;
    }
    
    return (
      <div className="stories-recs-container group">
        <ul className="stories">
          {this.renderStories()}
        </ul>
        {this.renderRecommendations()}
      </div>
    );
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories }, dispatch);
};

function mapStateToProps(state) {
  return { stories: state.stories.all, currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesIndex);