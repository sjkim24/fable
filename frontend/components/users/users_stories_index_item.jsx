import React, { Component } from "react";
import { Link } from "react-router";
import DropDownMenu from "../base/drop_down_menu.jsx";

class UsersStoriesIndexItem extends Component {
  constructor() {
    super();
    
    this.state = { dropDownMenuActive: false };
    this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
  }
  
  toggleDropDownMenu() {
    this.setState({ dropDownMenuActive: !this.state.dropDownMenuActive });
  }
  
  renderMinRead() {
    const readTime = this.props.story.read_time;
    
    return readTime > 1 ? `${readTime} mins read` : `${readTime} min read`;
  }
  
  render() {
    const story = this.props.story;

    return (
      <div className="user-stories-item">
        <Link to={`/stories/${story.id}`}>
          <div className="user-stories-title">{story.title}</div>
        </Link>
        <div className="user-stories-info-container group">
          <div className="user-stories-info users-stories-info-published-date">
            {story.published_date}
          </div>
          <div className="user-stories-info users-stories-info-kdot">
            {"\u2022"}
          </div>
          <div className="user-stories-info users-stories-info-read-time">
            {this.renderMinRead()} 
          </div>
          <div className="user-stories-info users-stories-info-kdot">
            {"\u2022"}
          </div>
          <div 
            className="user-stories-info users-stories-info-dropdown"
            onClick={this.toggleDropDownMenu}>
            <img 
              src="/images/icons/arrow.png" 
              alt="arrow image" 
              className="users-stories-arrow" />
            <DropDownMenu
              storyId={story.id}
              active={this.state.dropDownMenuActive} 
              name="user-stories"
              links={["Edit Story", "Delete Story"]} />
          </div>
        </div>
      </div>
    );
  }
};

export default UsersStoriesIndexItem;