import React, { Component } from "react";
import Heart from "../buttons/heart.jsx";
import { Link } from "react-router";

class UserTabRespItem extends Component {
  constructor() {
    super();
    
    this.setComment = this.setComment.bind(this);
  }
  
  setComment() {
    // set comment or make the link to comment show and add route to routes
    console.log("set comment clicked");
  }
  
  renderResponsesCount() {
    const count = this.props.response.comments_count;
    
    return count < 2 ?  `${count} response` : `${count} responses`;
  }
  
  render() {
    const response = this.props.response
    
    return (
      <li className="user-resp-item">
        <div className="story-header padding-side group">
          <Link to={`/users/@${response.username}`} className="story-user-img-container-top">
            <img src={response.user_image_url} alt="user img" className="story-user-img-top" />
          </Link>
          <div className="story-info-container-top">
            <div className="story-username-follow-top group">
              <Link to={`/users/@${response.username}`} className="story-username-top">
                {response.user_fullname}
              </Link>
            </div>
            <div className="story-published-date-min-read group">
              <div className="story-published-date">{response.published_date}</div>
            </div>
          </div>
        </div>
        <Link to={`/stories/${response.story_id}`}>
          <div className="comment-story-link group">
            <div className="comment-story-link-info">
              <div className="comment-story-link-title">{response.story_title}</div>
              <div className="comment-story-link-author">{response.story_author}</div>
            </div>
            <div className="comment-story-link-buttons">
              <img 
                src="/images/icons/comment_story_like.png"
                alt="heart img" 
                className="comment-story-link-heart-img" />
              <div className="comment-story-link-likes-count">{response.story_likes_count}</div>
              <img
                src="/images/icons/comment_story_response.png"
                alt="comment img"  
                className="comment-story-link-resp-img" />
              <div className="comment-story-link-resp-count">{response.story_comments_count}</div>
            </div>
          </div>
        </Link>
        <div className="story-content padding-side">
          {response.content}
        </div>
        <div 
          className="users-resp-read-more padding-side"
          onClick={this.setComment}>
          Read more...
        </div>
        <div className="user-resp-item-footer padding-side group">
          <div className="stories-item-like">
            <Heart 
              storyId={response.story_id}
              liked={response.liked} 
              className="stories-item-like-heart-img" 
              name="storiesIndex" />
            <div className="stories-item-like-count">{response.likes_count}</div>
          </div>
        </div>
      </li>
    );
  }
};

export default UserTabRespItem;