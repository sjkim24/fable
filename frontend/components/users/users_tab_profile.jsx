import React, { Component } from "react";
import StoriesIndexItem from "../stories/stories_index_item.jsx";
import UsersTabRecItem from "./users_tab_rec_item.jsx";

class ProfileTab extends Component {
  constructor() {
    super();
    
    this.toggleTab = this.toggleTab.bind(this);
  }
  
  renderLatestItems(latest) {
    const stories = latest.map((story, i) => {
      return <StoriesIndexItem key={`story-${i}`} story={story} profile={true} />
    });
    
    return stories;
  }
  
  renderRecommended(recommends) {
    const recs = recommends.slice(0,3).map((rec, i) => {
      return <UsersTabRecItem rec={rec} key={`rec-${i}`} />
    });
    
    return recs;
  }
  
  toggleTab() {
    this.props.toggleTab("recommends");
  }
  
  render() {
    const latest = this.props.latest;
    const recommends = this.props.recommends;
    const latDisplay = latest.length > 0 ? "" : "hidden";
    const recDisplay = recommends.length > 0 ? "" : "hidden";
    
    return (
      <div className="user-profile">
        <header 
          className={`user-show-tab-header ${latDisplay}`}>
          Latest
        </header>
        <ul className="user-profile-latest">
          {this.renderLatestItems(latest)}
        </ul>
        <header 
          className={`user-show-tab-header user-show-tab-header-recs ${recDisplay}`}>
          Recommended by {this.props.userFullname}
          <div 
            className="user-profile-recs-see-more"
            onClick={this.toggleTab}>
            See more
          </div>
        </header>
        <ul className="user-profile-recs">
          {this.renderRecommended(recommends)}
        </ul>
      </div>
    );
  }
};

export default ProfileTab;