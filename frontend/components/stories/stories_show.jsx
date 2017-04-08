import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory } from "../../actions/action_stories";
import { Link } from "react-router";
import Tag from "../buttons/tag.jsx";
import Heart from "../buttons/heart.jsx";
import Bookmark from "../buttons/bookmark.jsx";
import SideStoryButtons from "../buttons/side_story_buttons.jsx";
import Follow from "../buttons/follow.jsx";
import CommentForm from "../comments/comments_form.jsx";
import CommentsIndex from "../comments/comments_index.jsx";

class StoriesShow extends Component {
  constructor() {
    super();
    
    this.renderBannerImg = this.renderBannerImg.bind(this);
  }
  
  renderBannerImg() {
    if (this.props.story.image_url) {
      return <img src={this.props.story.image_url} alt="story banner image" className="story-banner-img" />;
    } else {
      return "";
    }
  }
  
  renderTags() {
    const tags = this.props.story.tags.map((tag, i) => {
      return <Tag className="story-tag" desc={tag.tag_desc} key={i} />
    });
    
    return tags;
  }
  
  componentWillMount() {
    if (!this.props.story) {
      this.props.fetchStory(this.props.params.storyId);
    }
  }
  
  formattedContent(content) {
    const parsed = JSON.parse(content);
    const paras = parsed.split("\n").map((para, i) => {
      return (
        <p key={`story-p-${i}`} className="story-content-p">{para}</p>
      );
    });
    
    return paras;
  }
  
  render() {
    const story = this.props.story;
    
    if (!story) {
      return <div className="loader" />;
    }
    
    const hasResponse = story.comments_count > 0 ? true : false;

    return (
      <div className="story">
        <header className="story-header padding-side group">
          <Link to={`/users/@${story.username}`} className="story-user-img-container-top">
            <img src={story.user_image_url} alt="user img" className="story-user-img-top" />
          </Link>
          <div className="story-info-container-top">
            <div className="story-username-follow-top group">
              <Link to={`/users/@${story.username}`} className="story-username-top">
                {story.user_fullname}
              </Link>
              <Follow 
                storyId={story.id}
                userId={story.user_id} 
                following={story.following_author}
                name="storiesShow" 
                className="story-follow story-follow-top" />
            </div>
            <div className="story-user-desc story-user-desc-top">{story.user_desc}</div>
            <div className="story-published-date-min-read group">
              <div className="story-published-date">{story.published_date}</div>
              <div className="story-kdot">{"\u2022"}</div>
              <div className="story-read-time">{`${story.read_time} min read`}</div>
            </div>
          </div>
        </header>
        <SideStoryButtons 
          storyId={story.id}
          liked={story.liked}
          likesCount={story.likes_count}
          bookmarked={story.bookmarked} />
        <div className="story-title padding-side">{story.title}</div>
        <div className="story-subtitle padding-side">{story.subtitle}</div>
        {this.renderBannerImg()}
        <div className="story-content padding-side">
          {this.formattedContent(story.content)}
        </div>
        <div className="story-tags padding-side group">
          {this.renderTags()}
        </div>
        <div className="story-buttons group">
          <div className="story-buttons-heart-resp group">
            <Heart
              storyId={story.id}
              liked={story.liked} 
              className="story-like-heart-img-bottom"
              name="storiesShow" />
            <div className="story-like-count-bottom">{story.likes_count}</div>
            <a href="#story-comments">
              <img 
                src="/images/icons/response.png" 
                alt="response img" 
                className="story-response-img" />
            </a>
            <div className="story-response-count-bottom">{story.comments_count}</div>
          </div>
          <Bookmark 
            storyId={story.id}
            bookmarked={story.bookmarked}
            className="story-bookmark-bottom" 
            name="storiesShow" />
        </div>
        <footer className="story-footer padding-side group">
          <Follow
            storyId={story.id}
            userId={story.user_id} 
            following={story.following_author}
            name="storiesShow" 
            className="story-follow story-follow-bottom" />
          <Link to={`/users/@${story.username}`} className="story-user-img-container-bottom">
            <img src={story.user_image_url} alt="user img" className="story-user-img-bottom" />
          </Link>
          <div className="story-info-container-bottom">
            <Link to={`/users/@${story.username}`} className="story-username-bottom">
              {story.user_fullname}
            </Link>
            <div className="story-user-desc story-user-desc-bottom">{story.user_desc}</div>
          </div>
        </footer>
        <div className="comment-form-container padding-side">
          <div className="comment-form-header">Response</div>
          <CommentForm
            storyId={story.id}
            userImgUrl={story.user_image_url}
            userFullName={story.user_fullname} />
        </div>
        <CommentsIndex storyId={story.id} hasResponse={hasResponse} />
      </div>
    );
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStory }, dispatch);
};

function mapStateToProps(state) {
  return { story: state.stories.story};
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesShow);