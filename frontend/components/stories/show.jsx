import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setStory } from "../../actions/story_set";
import { Link } from "react-router";

class StoryShow extends Component {
  constructor() {
    super();
    
    this.toggleFollow = this.toggleFollow.bind(this);
  }
  
  toggleFollow() {
    console.log("toggle follow clicked");
  }
  
  render() {
    const story = this.props.story;

    console.log(story);
    return (
      <div className="story">
        <div className="story-header group">
          <Link to={`/users/@${story.username}`} className="story-user-img-container">
            <img src={story.user_image_url} alt="user img" className="story-user-img" />
          </Link>
          <div className="story-info-container">
            <div className="story-username-follow group">
              <Link to={`/users/@${story.username}`} className="story-username">
                {story.username}
              </Link>
              <div className="story-follow-btn" onClick={this.toggleFollow} className="story-follow">
                Follow
              </div>
            </div>
            <div className="story-tags group">
              <div className="story-tag">Tag1.</div>
              <div className="story-tag">Tag2.</div>
              <div className="story-tag">Tag3.</div>
            </div>
            <div className="story-published-date-min-read group">
              <div className="story-published-date">{story.published_date}</div>
              <div className="story-kdot">{"\u2022"}</div>
              <div className="story-read-time">{`${story.read_time} min read`}</div>
            </div>
          </div>
        </div>
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