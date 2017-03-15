import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_index"; // this is the action creator we want to call
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
  
  render() {
    return (
      <ul className="stories">
        {this.renderStories()}
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