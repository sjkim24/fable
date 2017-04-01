import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Follow from "../buttons/follow.jsx";

class UsersFollowsModal extends Component {
  getData() {
    if (this.props.type === "followings") {
      return this.props.user.followings;
    } else {
      return this.props.user.followers;
    }
  }
  
  renderListItem(data) {
    const items = data.map((user, i) => {
      return (
        <li className="user-follows-item">
          <img src={user.image_url} alt="user image" />
          <Follow />
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

    return (
      <ul className="user-follows-list">
        {this.renderListItem(data)}
      </ul>
    );
  }
};

function mapStateToProps(state) {
  return { user: state.user.user };
};

export default connect(mapStateToProps, null)(UsersFollowsModal);