import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import Tag from "../buttons/tag.jsx";

class RecsIndex extends Component {
  renderTopStories() {
    const topStories = this.props.topStories.map((topStory, i) => {
      // console.log(topStory.id);
      return (
        <li className="rec-item group" key={`top-story-${i}`}>
          <Link to={`/users/@${topStory.username}`}>
            <img src={topStory.user_image_url} alt="user image" className="rec-user-img" />
          </Link>
          <Link to={`/stories/${topStory.id}`} className="rec-item-info">
            <div className="rec-item-title">{topStory.title}</div>
            <div className="rec-item-user-fullname">{topStory.user_fullname}</div>
          </Link>
        </li>
      );
    });
    
    return topStories;
  }
  
  render() {
    // console.log(this.props.topStories);
    return (
      <ul className="recs">
        <li className="rec">
          <div className="rec-category">Top Stories</div>
          <ul className="rec-items-container">
            {this.renderTopStories()}
          </ul>
        </li>
        <li className="rec">
          <div className="rec-category">Top Sports</div>
          <ul className="rec-items-container">
            <li className="rec-item">1</li>
            <li className="rec-item">2</li>
            <li className="rec-item">3</li>
          </ul>
        </li>
        <li className="rec">
          <div className="rec-category">Top Technology</div>
          <ul className="rec-items-container">
            <li className="rec-item">1</li>
            <li className="rec-item">2</li>
            <li className="rec-item">3</li>
          </ul>
        </li>
        <li className="rec-tags">
          <div className="rec-category">Tags you follow</div>
          <ul className="rec-tags-container group">
            <Tag desc="Sports"/>
            <Tag desc="Business"/>
            <Tag desc="Science"/>
            <Tag desc="Technology"/>
            <Tag desc="Fashion"/>
            <Tag desc="Politics"/>
          </ul>
        </li>
      </ul>
    );
  }
};
// {this.renderRecs()} use this instead of lists later

export default RecsIndex;