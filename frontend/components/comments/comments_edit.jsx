import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchComment } from "../../actions/action_comments";
import NotAllowed from "../base/not_allowed.jsx";
import { Link } from "react-router";
import ContentForm from "../base/content_form.jsx";

class CommentsEdit extends Component {
  constructor() {
    super();
    
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    console.log("submit clicked");
  }
  
  componentWillMount() {
    this.props.fetchComment(this.props.params.commentId);
  }
  
  render() {
    const comment = this.props.comment;
    const currentUser = this.props.currentUser;
    
    if (!comment || !currentUser) {
      return <div className="loader" />;
    } else if (!currentUser || currentUser.id !== comment.user_id) {
      return <NotAllowed />;
    }
    
    const hasReplies = comment.comments_count > 0 ? true : false;
    const storyLinkDisplay = comment.story_title ? "" : "hidden";
    console.log(comment);
    return (
      <div className="story">
        <Link to={`/stories/${comment.story_id}`} className={`${storyLinkDisplay}`}>
          <div className="comment-story-link card group">
            <div className="comment-story-link-info">
              <div className="comment-story-link-title">{comment.story_title}</div>
              <div className="comment-story-link-author">{comment.story_author}</div>
            </div>
            <div className="comment-story-link-buttons">
              <img 
                src="/images/icons/comment_story_like.png"
                alt="heart img" 
                className="comment-story-link-heart-img" />
              <div className="comment-story-link-likes-count">{comment.story_likes_count}</div>
              <img
                src="/images/icons/comment_story_response.png"
                alt="comment img"  
                className="comment-story-link-resp-img" />
              <div className="comment-story-link-resp-count">{comment.story_comments_count}</div>
            </div>
          </div>
        </Link>
        <form onSubmit={this.handleOnSubmit}>
          <ContentForm content={comment.content}/>
          <input className="button" type="submit" value="Save" />
        </form>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComment }, dispatch);
};

function mapStateToProps(state) {
  return { comment: state.comments.comment, currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsEdit);