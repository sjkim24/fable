import React, { Component } from "react";
import { Link } from "react-router";

class UsersStoriesIndexItem extends Component {
  renderDropDown() {
    return (
      <div className="user-stories-info users-stories-info-dropdown">
        dropdown
      </div>
    ); 
  }
  
  renderMinRead() {
    const readTime = this.props.story.read_time;
    
    return readTime > 1 ? `${readTime} mins read` : `${readTime} min read`;
  }
  
  render() {
    const story = this.props.story;

    return (
      <Link to={`/stories/${story.id}`} className="user-stories-item">
        <div className="user-stories-title">{story.title}</div>
        <div className="user-stories-info-container group">
          <div className="user-stories-info users-stories-info-published-date">
            {story.published_date}
          </div>
          <div className="user-stories-info users-stories-info-kdot">
            {"\u2022"}
          </div>
          <div className="user-stories-info users-stories-info-read-time">
            {this.renderMinRead()} 
          </div>
          <div className="user-stories-info users-stories-info-kdot">
            {"\u2022"}
          </div>
          {this.renderDropDown()}
        </div>
      </Link>
    );
  }
};

export default UsersStoriesIndexItem;