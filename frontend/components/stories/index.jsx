import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";
import StoriesIndexItem from "./index_item.jsx";
import RecsIndex from "../recommendations/index.jsx";

class StoriesIndex extends Component {
  componentWillMount() {
    this.props.fetchStories();
  }
  
  renderStories() {
    const stories = this.props.stories.map((story, i) => {
      return <StoriesIndexItem key={`story-${i}`} story={story} />
    });
    
    return stories;
  }
  
  renderRecommendations() {
    return (
      <RecsIndex />
    );
  }
  
  render() {
    console.log(this.props.stories);
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
  return { stories: state.stories.all };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesIndex);