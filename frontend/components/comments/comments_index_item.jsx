import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import Heart from "../buttons/heart.jsx";
import { setComment } from "../../actions/action_comments";


class CommentsIndexItem extends Component {
  constructor() {
    super()
    
    this.setComment = this.setComment.bind(this);
  }
  
  setComment() {
    this.props.setComment(this.props.comment)
  }
  
  formattedContent(content) {
    const parsed = JSON.parse(content);
    const paras = parsed.split("\n").map((para, i) => {
      return (
        <p key={`comment-p-${i}`} className="comment-content-p">{para}</p>
      );
    });
    
    return paras;
  }
  
  render() {
    const comment = this.props.comment;

    return (
      <div className="comment comments-show-all">
        <div className="comment-header group">
          <Link to={`/users/@${comment.username}`}>
            <img src={comment.user_image_url} alt="user image" className="comment-user-img" />
          </Link>
          <div className="comment-header-info">
            <Link to={`/users/@${comment.username}`}>
              <div className="comment-user-fullname">{comment.user_fullname}</div>
            </Link>
            <div className="comment-published-date">{comment.published_date}</div>
          </div>
        </div>
        <Link to={`/comments/${comment.id}`} onClick={this.setComment}>
          <div className="comment-content">
            {this.formattedContent(comment.content)}
          </div>
        </Link>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setComment }, dispatch);
};

export default connect(null, mapDispatchToProps)(CommentsIndexItem);