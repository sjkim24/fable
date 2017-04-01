import React, { Component } from "react";
import UsersTabRecItem from "./users_tab_rec_item.jsx";

class RecommendsTab extends Component {
  renderRecommended(recommends) {
    const recs = recommends.map((rec, i) => {
      return <UsersTabRecItem rec={rec} key={`rec-${i}`} />
    });
    
    return recs;
  }
  
  render() {
    const recommends = this.props.recommends;
    const recDisplay = recommends.length > 0 ? "" : "hidden";
    
    return (
      <div className="user-profile-recs-container">
        <header 
          className={`user-show-tab-header ${recDisplay}`}>
          Recommended by {this.props.userFullname}
        </header>
        <ul className="user-profile-recs">
          {this.renderRecommended(recommends)}
        </ul>
      </div>
    );
  }
};

export default RecommendsTab;