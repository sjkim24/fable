import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setComment } from "../../actions/comment_set";
import { fetchComment } from "../../actions/comment_fetch";
import { Link } from "react-router";
import Follow from "../buttons/follow.jsx";
import Heart from "../buttons/heart.jsx";
import Tag from "../buttons/tag.jsx";
import CommentForm from "../comments/comments_form.jsx";
import RepliesIndex from "../replies/replies_index.jsx";

class CommentsShow extends Component {
  renderTags() {
    const tags = this.props.comment.tags.map((tag, i) => {
      return <Tag className="story-tag" desc={tag.tag_desc} key={i} />
    });
    
    return tags;
  }
  
  componentWillMount() {
    if (!this.props.comment) {
      this.props.fetchComment(this.props.params.commentId);
    }
  }
  
  render() {
    const comment = this.props.comment;
    
    if (!comment) {
      return <div className="loader" />;
    }
    
    const hasReplies = comment.comments_count > 0 ? true : false;
    
    return (
      <div className="story">
        <div className="story-header padding-side group">
          <Link to={`/users/@${comment.username}`} className="story-user-img-container-top">
            <img src={comment.user_image_url} alt="user img" className="story-user-img-top" />
          </Link>
          <div className="story-info-container-top">
            <div className="story-username-follow-top group">
              <Link to={`/users/@${comment.username}`} className="story-username-top">
                {comment.user_fullname}
              </Link>
              <Follow 
                commentId={comment.id}
                userId={comment.user_id} 
                following={comment.following_author}
                name="commentsShow" 
                className="story-follow story-follow-top" />
            </div>
            <div className="story-user-desc story-user-desc-top">{comment.user_desc}</div>
            <div className="story-published-date-min-read group">
              <div className="story-published-date">{comment.published_date}</div>
            </div>
          </div>
        </div>
        <div>story link with title author likes count resp counts</div>
        <div className="story-content padding-side">
          {comment.content}
        </div>
        <div className="story-tags padding-side group">
          {this.renderTags()}
        </div>
        <div className="story-buttons group">
          <div className="story-buttons-heart-resp group">
            <Heart
              commentId={comment.id}
              liked={comment.liked} 
              className="story-like-heart-img-bottom"
              name="commentsShow" />
            <div className="story-like-count-bottom">{comment.likes_count}</div>
            <a href="#story-comments">
              <img 
                src="/images/icons/response.png" 
                alt="response img" 
                className="story-response-img" />
            </a>
            <div className="story-response-count-bottom">{comment.comments_count}</div>
          </div>
        </div>
        <footer className="story-footer padding-side group">
          <Follow
            commentId={comment.id}
            userId={comment.user_id} 
            following={comment.following_author}
            name="commentsShow" 
            className="story-follow story-follow-bottom" />
          <Link to={`/users/@${comment.username}`} className="story-user-img-container-bottom">
            <img src={comment.user_image_url} alt="user img" className="story-user-img-bottom" />
          </Link>
          <div className="story-info-container-bottom">
            <Link to={`/users/@${comment.username}`} className="story-username-bottom">
              {comment.user_fullname}
            </Link>
            <div className="story-user-desc story-user-desc-bottom">{comment.user_desc}</div>
          </div>
        </footer>
        <div className="comment-form-container padding-side">
          <div className="comment-form-header">Response</div>
          <CommentForm
            userImgUrl={comment.user_image_url}
            userFullName={comment.user_fullname} />
        </div>
        <RepliesIndex commentId={comment.id} hasReplies={hasReplies} />
      </div>
    );
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setComment, fetchComment }, dispatch);
};

function mapStateToProps(state) {
  return { comment: state.comments.comment };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsShow);