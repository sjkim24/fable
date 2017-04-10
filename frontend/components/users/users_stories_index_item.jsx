import React, { Component } from "react";

class UsersStoriesIndexItem extends Component {
  renderDropDown() {
    return (
      <div className="users-stories-info users-stories-info-dropdown">
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
      <div className="users-stories-item">
        <div className="users-stories-title">{story.title}</div>
        <div className="users-stories-info-container group">
          <div className="users-stories-info users-stories-info-published-date">
            {story.published_date}
          </div>
          <div className="users-stories-info users-stories-info-kdot">
            {"\u2022"}
          </div>
          <div className="users-stories-info users-stories-info-read-time">
            {this.renderMinRead()} 
          </div>
          <div className="users-stories-info users-stories-info-kdot">
            {"\u2022"}
          </div>
          {this.renderDropDown()}
        </div>
      </div>
    );
  }
};

export default UsersStoriesIndexItem;