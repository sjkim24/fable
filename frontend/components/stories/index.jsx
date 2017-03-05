import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchPosts } from '../actions/index'; // this is the action creator we want to call
// import { Link } from 'react-router'; // 

class StoriesIndex extends Component {
  render() {
    console.log("hit");
    return (
      <div>
        Story Index!!
      </div>
    );
  }
}

export default StoriesIndex;

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchPosts }, dispatch);
// }
// 
// export default connect(null, mapDispatchToProps)(PostsIndex);

// to below
// export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

//to below
// export default connect(null, { fetchPosts })(PostsIndex);
// an line 3 gets commented since we don't need the syntax 'bindActionCreators'