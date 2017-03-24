import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setStory } from "../../actions/story_set";
import { Link } from "react-router";

class StoryShow extends Component {
  render() {
    console.log(this.props.story);
    return (
      <div className="story">
        Story Show!
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setStory }, dispatch);
};

function mapStateToProps(state) {
  return { story: state.stories.story };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryShow);