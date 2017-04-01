import React, { Component } from "react";
import StoriesIndexItem from "../stories/stories_index_item.jsx";

class ProfileTab extends Component {
  renderLatestItems() {
    const stories = this.props.latest.map((story, i) => {
      return <StoriesIndexItem key={`story-${i}`} story={story} profile={true} />
    });
    
    return stories;
  }
  
  renderRecImage(rec) {
    if ( rec.image_url) {
      return (
        <img 
          src={rec.image_url} 
          alt="story img" 
          className="rec-img" />
      );
    }
  }
  
  renderRecommended() {
    const recs = this.props.recommends.map((rec, i) => {
      const imgClass = rec.image_url ? "" : "rec-left-container-no-img";

      return (
        <li className="user-profile-rec-item" key={`rec-${i}`}>
          <div className={`rec-left-container ${imgClass}`}>
            <div className="rec-title">{rec.story_title}</div>
            <div className="rec-author">{rec.author_fullname}</div>
          </div>
          {this.renderRecImage(rec)}
        </li>
      );
    });
    
    return recs;
  }
  
  render() {
    const latest = this.props.latest;
    const recommends = this.props.recommends;
    
    console.log(latest, recommends);
    return (
      <div className="user-profile">
        <ul className="user-profile-latest">
          {this.renderLatestItems()}
        </ul>
        <ul className="user-profile-recs">
          {this.renderRecommended()}
        </ul>
      </div>
    );
  }
};

export default ProfileTab;