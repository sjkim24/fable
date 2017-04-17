import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import Follow from "../buttons/follow.jsx";
import Tag from "../buttons/tag.jsx";

class SearchIndexUserItem extends Component {
  render() {
    const user = this.props.user;

    return (
      <li className="user-follows-item group">
        <Link to={`/users/@${user.username}`}>
          <img src={user.image_url} alt="user image" className="user-follows-img" />
        </Link>
        <Follow 
          name="searchIndexUserItem"
          userShowId={this.props.user.id}
          userId={user.id} 
          following={user.following} 
          className="search-user-item-follow" />
        <Link to={`/users/@${user.username}`}>
          <div className="user-follows-item-info">
            <div className="user-follows-item-info-fullname">
              {user.fullname}
            </div>
            <div className="user-follows-item-info-desc">{user.desc}</div>
          </div>
        </Link>
      </li>
    );
  }
};

export default SearchIndexUserItem;