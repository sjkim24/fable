import React, { Component } from "react";
import { Link } from "react-router";
import Heart from "../buttons/heart.jsx";


class CommentsIndexItem extends Component {
  render() {
    const comment = this.props.comment;
    
    return (
      <div className="comment comments-show-all">
        <div className="comment-header group">
          <img src={comment.user_image_url} alt="user image" className="comment-user-img" />
          <div className="comment-header-info">
            <div className="comment-user-fullname">{comment.user_fullname}</div>
            <div className="comment-published-date">{comment.published_date}</div>
          </div>
        </div>
        <div className="comment-content">{comment.content}</div>
        <div className="comment-buttons group">
          <Heart
            commentId={comment.id}
            storyId={comment.story_id} 
            className="comment-like" 
            liked={comment.liked} 
            name="commentsIndex" />
          <div className="comment-likes-count">{comment.likes_count}</div>
        </div>
      </div>
    );
  }
};

export default CommentsIndexItem;