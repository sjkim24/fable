import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import Heart from "../buttons/heart.jsx";
// import { setReply } from "../../actions/reply_set";
import { setComment } from "../../actions/action_comments";
import { fetchReplies } from "../../actions/action_replies";

class RepliesIndexItem extends Component {
  constructor() {
    super()
    
    this.setComment = this.setComment.bind(this);
  }
  
  setComment() {
    this.props.resetState();
    this.props.setComment(this.props.reply);
    this.props.fetchReplies(this.props.reply.id);
  }
  
  render() {
    const reply = this.props.reply;

    return (
      <div className="comment comments-show-all">
        <div className="comment-header group">
          <Link to={`/users/@${reply.username}`}>
            <img src={reply.user_image_url} alt="user image" className="comment-user-img" />
          </Link>
          <div className="comment-header-info">
            <Link to={`/users/@${reply.username}`}>
              <div className="comment-user-fullname">{reply.user_fullname}</div>
            </Link>
            <div className="comment-published-date">{reply.published_date}</div>
          </div>
        </div>
        <Link to={`/comments/${reply.id}`} onClick={this.setComment}>
          <div className="comment-content">{reply.content}</div>
        </Link>
        <div className="comment-buttons group">
          <Heart
            commentId={reply.id}
            storyId={reply.story_id} 
            className="comment-like" 
            liked={reply.liked} 
            name="commentsIndex" />
          <div className="comment-likes-count">{reply.likes_count}</div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setComment, fetchReplies }, dispatch);
};

export default connect(null, mapDispatchToProps)(RepliesIndexItem);