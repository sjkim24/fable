import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Follow from "../buttons/follow.jsx";
import Tag from "../buttons/tag.jsx";

class SearchIndexUserItem extends Component {
  render() {
    const user = this.props.user;
    
    return (
      <li className="user-follows-item group">
        <img src={user.image_url} alt="user image" className="user-follows-img" />
        <Follow 
          name="searchIndexUserItem"
          userShowId={this.props.user.id}
          userId={user.id} 
          following={user.following} 
          className="search-user-item-follow" />
        <div className="user-follows-item-info">
          <div className="user-follows-item-info-fullname">
            {user.fullname}
          </div>
          <div className="user-follows-item-info-desc">{user.desc}</div>
        </div>
      </li>
    );
  }
};

export default SearchIndexUserItem;