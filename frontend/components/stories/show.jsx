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
    this.renderBannerImg = this.renderBannerImg.bind(this);
  }
  
  toggleFollow() {
    console.log("toggle follow clicked");
  }
  
  renderBannerImg() {
    if (this.props.story.image_url) {
      return <img src={this.props.story.image_url} alt="story banner image" className="story-banner-img" />;
    } else {
      return "";
    }
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
              <div className="story-follow" onClick={this.toggleFollow}>
                Follow
              </div>
            </div>
            <div className="story-user-desc">{story.user_desc}</div>
            <div className="story-published-date-min-read group">
              <div className="story-published-date">{story.published_date}</div>
              <div className="story-kdot">{"\u2022"}</div>
              <div className="story-read-time">{`${story.read_time} min read`}</div>
            </div>
          </div>
        </div>
        <div className="story-title">{story.title}</div>
        <div className="story-subtitle">{story.subtitle}</div>
        {this.renderBannerImg()}
        <div className="story-content">
          {story.content}
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