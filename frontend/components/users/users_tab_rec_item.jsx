import React, { Component } from "react";

class UsersTabRecItem extends Component {
  renderRecImage(rec) {
    if (rec.image_url) {
      return (
        <img 
          src={rec.image_url} 
          alt="story img" 
          className="rec-img" />
      );
    }
  }
  
  render() {
    const rec = this.props.rec;
    const imgClass = rec.image_url ? "" : "rec-title-no-img";
    
    return (
      <li className="user-profile-rec-item padding-side">
        <div className="rec-left-container">
          <div className={`rec-title ${imgClass}`}>{rec.story_title}</div>
          <div className="rec-author">{rec.author_fullname}</div>
        </div>
        {this.renderRecImage(rec)}
      </li>
    );
  }
};

export default UsersTabRecItem;