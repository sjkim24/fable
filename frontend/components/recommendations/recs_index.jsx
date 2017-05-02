import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import Tag from "../buttons/tag.jsx";
// import { fetchRecs } from "../../actions/recs_fetch";
// import RecsIndexItem from "./recs_index_item.jsx";

class RecsIndex extends Component {
  componentWillMount() {
    // fetch recs
  }
  
  renderTopLikedStories() {
    const stories = this.props.topLikedStories.map((story, i) => {
      return (
        <li className="rec-item group" key={`top-liked-story-${i}`}>
          <Link to={`/users/@${story.username}`}>
            <img src={story.user_image_url} alt="user image" className="rec-user-img" />
          </Link>
          <Link to={`/stories/${story.id}`} className="rec-item-info">
            <div className="rec-item-title">{story.title}</div>
            <div className="rec-item-user-fullname">{story.user_fullname}</div>
          </Link>
        </li>
      );
    });
    
    return stories;
  }
  
  renderTopBookmarkedStories() {
    const stories = this.props.topBookmarkedStories.map((story, i) => {
      return (
        <li className="rec-item group" key={`top-bkmrkd-story-${i}`}>
          <Link to={`/users/@${story.username}`}>
            <img src={story.user_image_url} alt="user image" className="rec-user-img" />
          </Link>
          <Link to={`/stories/${story.id}`} className="rec-item-info">
            <div className="rec-item-title">{story.title}</div>
            <div className="rec-item-user-fullname">{story.user_fullname}</div>
          </Link>
        </li>
      );
    });
    
    return stories
  }
  
  renderTagFollows() {
    if (this.props.currentUser) {
      const tagFollows = this.props.currentUser.tag_follows.map((tagFollow, i) => {
        return (
          <Tag key={`tag-follow-${i}`} desc={tagFollow.tag_desc} />
        )
      });
      
      return tagFollows;
    }
  }
  
  render() {
    const tagFollowsDisplay = this.props.currentUser ? "" : "hidden";
    
    return (
      <ul className="recs">
        <li className="rec">
          <div className="rec-category">Top Liked Stories</div>
          <ul className="rec-items-container">
            {this.renderTopLikedStories()}
          </ul>
        </li>
        <li className="rec">
          <div className="rec-category">Top Bookmarked Stories</div>
          <ul className="rec-items-container">
            {this.renderTopBookmarkedStories()}
          </ul>
        </li>
        <li className={`rec-tags ${tagFollowsDisplay}`}>
          <div className="rec-category">Tags you follow</div>
          <ul className="rec-tags-container group">
            {this.renderTagFollows()}
          </ul>
        </li>
      </ul>
    );
  }
};
// {this.renderRecs()} use this instead of lists later

export default RecsIndex;