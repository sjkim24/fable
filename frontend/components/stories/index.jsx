import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";
import StoriesIndexItem from "./index_item.jsx";
// import { Link } from react-router"; // 

class StoriesIndex extends Component {
  componentWillMount() {
    this.props.fetchStories();
  }
  
  renderStories() {
    const stories = this.props.stories.map((story,i) => {
      return <StoriesIndexItem key={i} story={story} />
    });
    
    return stories;
  }
  
  renderRecommendations() {
    return (
      <ul className="stories-recs">
        <li className="stories-rec stories-rec-1">
          <div className="stories-rec-category">Top Stories</div>
          <ul className="stories-rec-items-container">
            <li className="stories-rec-item">1</li>
            <li className="stories-rec-item">2</li>
            <li className="stories-rec-item">3</li>
          </ul>
        </li>
        <li className="stories-rec stories-rec-2">
          <div className="stories-rec-category">Top Sports</div>
          <ul className="stories-rec-items-container">
            <li className="stories-rec-item">1</li>
            <li className="stories-rec-item">2</li>
            <li className="stories-rec-item">3</li>
          </ul>
        </li>
        <li className="stories-rec stories-rec-2">
          <div className="stories-rec-category">Top Technology</div>
          <ul className="stories-rec-items-container">
            <li className="stories-rec-item">1</li>
            <li className="stories-rec-item">2</li>
            <li className="stories-rec-item">3</li>
          </ul>
        </li>
      </ul>
    );
  }
  
  render() {
    console.log("yo");
    return (
      <ul className="stories">
        {this.renderStories()}
        {this.renderRecommendations()}
      </ul>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories }, dispatch);
}

function mapStateToProps(state) {
  return { stories: state.stories.all };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoriesIndex);

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// }
// 
// export default connect(null, mapDispatchToProps)(PostsIndex);

// to below
// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

//to below
// export default connect(null, { fetchPosts })(PostsIndex);
// an line 3 gets commented since we don"t need the syntax "bindActionCreators"