import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchComment, updateComment } from "../../actions/action_comments";
import NotAllowed from "../base/not_allowed.jsx";
import { Link } from "react-router";
import ContentForm from "../base/content_form.jsx";

class CommentsEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  constructor() {
    super();
    
    this.state = { content: "" }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleContentFormChange = this.handleContentFormChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  
  handleContentFormChange(content) {
    this.setState({ content: content });
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    
    this.setState({ error: false }, () => {
      if (this.state.content.length > 0) { // input check
        const that = this;
        const params = {
          comment: { content: this.state.content }, 
          authenticity_token: this.props.token 
        };
        this.props.updateComment(this.props.comment.id, params)
        .then(() => {
          this.context.router.push(`/comments/${that.props.comment.id}`);
        });
      } else {
        this.setState({ error: true });
      }
    })
  }
  
  componentWillMount() {
    const that = this;
    this.props.fetchComment(this.props.params.commentId)
    .then(() => {
      const state = {};
      const content = JSON.parse(this.props.comment.content);
      state.content = content;
      
      this.setState(state);
    });
  }
  
  goBack() {
    history.back();
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
        <form className="comment-edit" onSubmit={this.handleOnSubmit}>
          <ContentForm
            handleContentFormChange={this.handleContentFormChange}  
            content={this.state.content}/>
          <div className="comment-edit-btns">
            <input className="comment-edit-save-btn button" type="submit" value="Save" />
            <div className="comment-edit-cancel-btn button" onClick={this.goBack}>
              Cancel
            </div>
          </div>
        </form>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComment, updateComment }, dispatch);
};

function mapStateToProps(state) {
  return { 
    comment: state.comments.comment, currentUser: state.auth.currentUser,
    token: state.auth.authToken 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsEdit);