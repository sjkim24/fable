import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import DropDownMenu from "../base/drop_down_menu.jsx";

class UsersCommentsIndexItem extends Component {
  constructor() {
    super();
    
    this.state = { dropDownMenuActive: false };
    this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
  }
  
  toggleDropDownMenu() {
    this.setState({ dropDownMenuActive: !this.state.dropDownMenuActive });
  }
  
  render() {
    const comment = this.props.comment;
    // console.log(comment);
    return (
      <div className="user-comments-item">
        <Link to={`/comments/${comment.id}`}>
          <div className="user-comments-item-story-title">
            {comment.story_title}
          </div>
        </Link>
          <div className="user-comments-item-info group">
            <div className="user-comments-info user-comments-info-read-time">
              {comment.published_date}
            </div>
            <div className="user-comments-info user-comments-info-kdot">
              {"\u2022"}
            </div>
            <div 
              className="user-comments-info user-comments-info-dropdown"
              onClick={this.toggleDropDownMenu}>
              <img 
                src="/images/icons/arrow.png" 
                alt="arrow image" 
                className="users-stories-arrow" />
              <DropDownMenu
                commentId={comment.id}
                active={this.state.dropDownMenuActive} 
                name="user-comments-index"
                links={["Edit Response", "Delete Response"]} />
            </div>
          </div>
      </div>
    );
  }
};

export default UsersCommentsIndexItem;