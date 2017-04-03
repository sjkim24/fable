import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Follow from "../buttons/follow.jsx";

class UsersFollowsModal extends Component {
  getData() {
    if (this.props.type === "followings") {
      return this.props.followings;
    } else {
      return this.props.followers;
    }
  }
  
  renderListItem(data) {
    const type = this.props.type;
    const items = data.map((user, i) => {
      return (
        <li className="user-follows-item group" key={`${type}-${i}`}>
          <img src={user.image_url} alt="user image" className="user-follows-img" />
          <Follow 
            name={`${type}Modal`}
            userShowId={this.props.user.id}
            userId={user.id} 
            following={user.following} 
            className="users-follows-modal" />
          <div className="user-follows-item-info">
            <div className="user-follows-item-info-fullname">
              {user.fullname}
            </div>
            <div className="user-follows-item-info-desc">{user.desc}</div>
          </div>
        </li>
      );
    });
    
    return items;
  }
  
  render() {
    const data = this.getData();
    const word = this.props.type === "followings" ? "follows" : "is followed by"

    return (
      <ul className="user-follows-list">
        <div className="user-follows-list-header">
          {`${this.props.user.fullname} ${word}`}
        </div>
        {this.renderListItem(data)}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return { 
    user: state.user.user,
    followers: state.user.followers,
    followings: state.user.followings 
  };
};

export default connect(mapStateToProps, null)(UsersFollowsModal);