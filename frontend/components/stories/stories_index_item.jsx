import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setStory } from "../../actions/action_stories";
import { fetchUser } from "../../actions/action_user";
import { Link } from "react-router";
import Heart from "../buttons/heart.jsx";
import Bookmark from "../buttons/bookmark.jsx";

class StoriesIndexItem extends Component {
  constructor() { 
    super();
    
    this.setStory = this.setStory.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }
  
  renderSubtitle() {
    let subtitle = this.props.story.subtitle;
    const profileViewHide = this.props.profile ? "hidden" : "";
    
    if (subtitle && subtitle.split(" ").length > 15) {
      subtitle = `${subtitle.split(" ").slice(0,15).join(" ")}...`;
    } else if (subtitle) {
      subtitle = subtitle.split(" ").slice(0,15).join(" ");
    }
    
    return (
      <h4 className={`stories-item-subtitle ${profileViewHide}`}>
        {subtitle}
      </h4> 
    );
  }
  
  renderSnippet() {
    // a story has...
    // banner img, title and subtitle -> no snippet
    // for now it's either the above or snippet (~20 words)
    
    // implement these later
    // banner img, title but NO subtitle -> snippet (~20 words)
    // title, subtitle but NO banner img -> snippet (~30 words)
    // title but NO subtitle, banner img -> snippet (~50 words or the first paragraph)
    const shouldRender = !(this.props.story.image_url && this.props.story.title && this.props.subtitle);
    if (shouldRender) {
      const parsed = JSON.parse(this.props.story.content);
      let content = parsed.split(" ");
      
      if (content.length > 20) {
        content = `${content.slice(0,20).join(" ")}...`;
      } else {
        content = content.slice(0,20).join(" ");
      }
      
      return <p className="stories-item-snippet">{`${content}`}</p>;
    }
  }
  
  renderBannerImg() {
    if (this.props.story.image_url) {
      const style = { backgroundImage: `url(${this.props.story.image_url})`}
      
      return <div style={style} className="stories-item-banner-img"/>;
    }
  }
  
  renderResponsesCount() {
    const count = this.props.story.comments_count;
    
    return count < 2 ?  `${count} response` : `${count} responses`;
  }
  
  setStory() {
    this.props.setStory(this.props.story);
  }
  
  fetchUser() {
    this.props.fetchStory(this.props.story.username)
  }
  
  render() {
    const story = this.props.story;
    const profileViewHide = this.props.profile ? "hidden" : "";
    
    return (
      <li className="stories-item card">
        <div className="stories-item-header group">
          <Link to={`/users/@${story.username}`} onClick={this.fetchUser}>
            <img src={story.user_image_url} alt="user img" className="stories-item-user-img" />
          </Link>
          <div className="stories-item-username-pub-rt-container group">
            <Link to={`/users/@${story.username}`} className="stories-item-username">{story.user_fullname}</Link>
            <div className="stories-item-pub-rt-container group">
              <div className="stories-item-published-date">{story.published_date}</div>
              <div className={`stories-item-kdot ${profileViewHide}`}>{"\u2022"}</div>
              <div className={`stories-item-read-time ${profileViewHide}`}>
                {`${story.read_time} min read`}
              </div>
            </div>
          </div>
        </div>
        <Link to={`/stories/${story.id}`} onClick={this.setStory}>
          {this.renderBannerImg()}
          <h3 className="stories-item-title">{story.title}</h3>
          {this.renderSubtitle()}
          {this.renderSnippet()}
          <div 
            className={`stories-item-read-more ${profileViewHide}`}
            onClick={this.setStory}>
            Read more...
          </div>
        </Link>
        <div className="stories-item-footer group">
          <div className="stories-item-like">
            <Heart 
              storyId={story.id}
              liked={story.liked} 
              className="stories-item-like-heart-img" 
              name="storiesIndex" />
            <div className="stories-item-like-count">{story.likes_count}</div>
          </div>
          <div className="stories-item-resp-book group">
            <Bookmark
              username={story.username}
              storyId={story.id}
              bookmarked={story.bookmarked}
              className="stories-item-bookmark" 
              name={this.props.name || "storiesIndex"} />
            <div className={`stories-item-responses ${profileViewHide}`}>
              {this.renderResponsesCount()}
            </div>
          </div>
        </div>
      </li>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setStory, fetchUser }, dispatch);
};

export default connect(null, mapDispatchToProps)(StoriesIndexItem);