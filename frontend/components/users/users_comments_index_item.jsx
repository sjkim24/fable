import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";

class UsersCommentsIndexItem extends Component {
  render() {
    console.log(this.props.comment);
    return (
      <div className="user-comments-item">
        <Link to={`/comments/${this.props.id}`}>
          <div className="user-comments-item-story-title">
            {this.props.story_title}
          </div>
        </Link>
          <div className="user-comments-item-info">
            <div>{this.props.published_date}</div>
            <div>{"\u2022"}</div>
            <div 
              className="user-stories-info users-stories-info-dropdown"
              onClick={this.toggleDropDownMenu}>
              <img 
                src="/images/icons/arrow.png" 
                alt="arrow image" 
                className="users-stories-arrow" />
              <DropDownMenu
                comment={comment.id}
                active={this.state.dropDownMenuActive} 
                name="user-stories"
                links={["Edit Story", "Delete Story"]} />
            </div>
          </div>
      </div>
    );
  }
};

export default UsersCommentsIndexItem;