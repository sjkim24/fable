import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory } from "../../actions/story_fetch";
import { Link } from "react-router";
import Tag from "../buttons/tag.jsx";
import Heart from "../buttons/heart.jsx";
import Bookmark from "../buttons/bookmark.jsx";
import Follow from "../buttons/follow.jsx";
import CommentForm from "../comments/form.jsx";

class StoryShow extends Component {
  constructor() {
    super();
    
    this.renderBannerImg = this.renderBannerImg.bind(this);
  }
  
  renderBannerImg() {
    if (this.props.story.image_url) {
      return <img src={this.props.story.image_url} alt="story banner image" className="story-banner-img" />;
    } else {
      return "";
    }
  }
  
  renderTags() {
    const tags = this.props.story.tags.map((tag, i) => {
      return <Tag className="story-tag" desc={tag.tag_desc} key={i} />
    });
    
    return tags;
  }
  
  componentWillMount() {
    if (!this.props.story) {
      const path = this.props.location.pathname;
      const id = path[path.length - 1];

      this.props.fetchStory(id);
    }
  }
  
  render() {
    const story = this.props.story;
    
    if (!story) {
      return <div className="loader" />;
    }
    
    console.log(story);
    return (
      <div className="story">
        <header className="story-header padding-side group">
          <Link to={`/users/@${story.username}`} className="story-user-img-container-top">
            <img src={story.user_image_url} alt="user img" className="story-user-img-top" />
          </Link>
          <div className="story-info-container-top">
            <div className="story-username-follow-top group">
              <Link to={`/users/@${story.username}`} className="story-username-top">
                {story.user_fullname}
              </Link>
              <Follow 
                storyId={story.id}
                userId={story.user_id} 
                following={story.following_author} 
                className="story-follow story-follow-top" />
            </div>
            <div className="story-user-desc story-user-desc-top">{story.user_desc}</div>
            <div className="story-published-date-min-read group">
              <div className="story-published-date">{story.published_date}</div>
              <div className="story-kdot">{"\u2022"}</div>
              <div className="story-read-time">{`${story.read_time} min read`}</div>
            </div>
          </div>
        </header>
        <div className="story-title padding-side">{story.title}</div>
        <div className="story-subtitle padding-side">{story.subtitle}</div>
        {this.renderBannerImg()}
        <div className="story-content padding-side">
          {story.content}
        </div>
        <div className="story-tags padding-side group">
          {this.renderTags()}
        </div>
        <div className="story-buttons group">
          <div className="story-buttons-heart-resp group">
            <Heart
              storyId={story.id}
              liked={story.liked} 
              className="story-like-heart-img-bottom"
              name="storiesShow" />
            <div className="story-like-count-bottom">{story.likes_count}</div>
            <a href="#story-response">
              <img 
                src="/images/icons/response.png" 
                alt="response img" 
                className="story-response-img" />
            </a>
            <div className="story-response-count-bottom">{story.responses_count}</div>
          </div>
          <Bookmark 
            storyId={story.id}
            bookmarked={story.bookmarked}
            className="story-bookmark-bottom" 
            name="storiesShow" />
        </div>
        <footer className="story-footer padding-side group">
          <Follow
            storyId={story.id}
            userId={story.user_id} 
            following={story.following_author} 
            className="story-follow story-follow-bottom" />
          <Link to={`/users/@${story.username}`} className="story-user-img-container-bottom">
            <img src={story.user_image_url} alt="user img" className="story-user-img-bottom" />
          </Link>
          <div className="story-info-container-bottom">
            <Link to={`/users/@${story.user_fullname}`} className="story-username-bottom">
              {story.username}
            </Link>
            <div className="story-user-desc story-user-desc-bottom">{story.user_desc}</div>
          </div>
        </footer>
        <div className="comment-form-container padding-side">
          <div className="comment-form-header">Response</div>
          <CommentForm
            userImgUrl={story.user_image_url}
            userFullName={story.user_fullname} 
            />
        </div>
      </div>
    );
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStory }, dispatch);
};

function mapStateToProps(state) {
  return { story: state.stories.story };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryShow);