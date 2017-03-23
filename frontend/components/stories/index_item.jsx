import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStories } from "../../actions/stories_fetch";

class StoriesIndexItem extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.toggleLike = this.toggleLike.bind(this);
    this.toggleBookmark = this.toggleBookmark.bind(this);
  }
  
  renderSubtitle() {
    const subtitle = this.props.story.subtitle;
    
    if (subtitle && subtitle.length > 20) {
      return <h4 className="stories-item-subtitle">
        {`${subtitle.split(" ").slice(0,20).join(" ")} ...`}
      </h4>;
    } else if (subtitle) {
      return <h4 className="stories-item-subtitle">{subtitle}</h4>;  
    }
  }
  
  renderSnippet() {
    // a story has...
    // banner img, title and subtitle -> no snippet
    // for now it's either the above or snippet (~20 words)
    
    // implement these later
    // banner img, title but NO subtitle -> snippet (~20 words)
    // title, subtitle but NO banner img -> snippet (~30 words)
    // title but NO subtitle, banner img -> snippet (~50 words or the first paragraph)
    const shouldRender = !(this.props.story.image_url && this.props.story.title && this.props.subtitle);
    if (shouldRender) {
      const content = this.props.story.content.split(" ").slice(0,20).join(" ");
      
      return <p className="stories-item-snippet">{`${content} ...`}</p>;
    }
  }
  
  renderBannerImg() {
    if (this.props.story.image_url) {
      const style = { backgroundImage: `url(${this.props.story.image_url})`}
      
      return <div style={style} className="stories-item-banner-img"/>;
    }
  }
  
  renderResponsesCount() {
    // this.props.story.liked
    // this.props.story.bookmarked
    const count = this.props.story.comments_count;
    
    return count < 2 ?  `${count} response` : `${count} responses`;
  }
  
  toggleLike() {
    // if current user isn't null
    const that = this;
    let url;
    let method;

    if (this.props.story.liked) {
      url = "/api/story_likes/destory";
      method = "delete";
    } else {
      url = `/api/stories/${this.props.story.id}/story_likes`;
      method = "post";
    }
    
    axios({
      method: method,
      url: url,
      data: { 
        story_like: { story_id: `${this.props.story.id}`},
        authenticity_token: this.state.token 
      }
    })
    .then(function(response) {
      that.prop.fetchStories();
    })
    .catch(function(error) {
      console.log(error);
    });
    // else render login form
  }
  
  toggleBookmark() {
    console.log("bookmark clicked");
  }
  
  render() {
    const heartName = this.props.story.liked ? "filled_heart" : "empty_heart";
    const bookmarkName = this.props.story.bookmarked ? "filled_bookmark" : "empty_bookmark";
    const heartImgSrc = `/images/icons/${heartName}.png`;
    const bookmarkImgSrc = `/images/icons/${bookmarkName}.png`;
    
    return (
      <li className="stories-item">
        <div className="stories-item-header group">
          <img src={this.props.story.user_image_url} className="stories-item-user-img" />
          <div className="stories-item-username-pub-rt-container group">
            <a href="" className="stories-item-username">{this.props.story.username}</a>
            <div className="stories-item-pub-rt-container group">
              <div className="stories-item-published-date">{this.props.story.published_date}</div>
              <div className="stories-item-kdot">{"\u2022"}</div>
              <div className="stories-item-read-time">{`${this.props.story.read_time} min read`}</div>
            </div>
          </div>
        </div>
        <div className="stories-item-details">
          {this.renderBannerImg()}
          <h3 className="stories-item-title">{this.props.story.title}</h3>
          {this.renderSubtitle()}
          {this.renderSnippet()}
          <a href="#" className="stories-item-read-more">Read more...</a>
        </div>
        <div className="stories-item-footer group">
          <div className="stories-item-like">
            <img src={heartImgSrc} onClick={this.toggleLike} className="stories-item-like-heart-img" />
            <div className="stories-item-like-count">{this.props.story.likes_count}</div>
          </div>
          <div className="stories-item-resp-book group">
            <img src={bookmarkImgSrc} onClick={this.toggleBookmark} className="stories-item-bookmark" />
            <div className="stories-item-responses">{this.renderResponsesCount()}</div>
          </div>
        </div>
      </li>
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStories }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoriesIndexItem);