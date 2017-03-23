import React, { Component } from 'react';

class StoriesIndexItem extends Component {
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
  
  render() {
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
          <div>Read more link</div>
        </div>
        <div className="stories-item-footer group">
          <div className="stories-item-like">
            <div className="stories-item-like-heart-img-container">
              <svg className="stories-item-like-heart-img">
                <path className="stories-item-like-heart-path"/>
              </svg>
            </div>
            <div className="stories-item-like-count">{this.props.story.likes_count}</div>
          </div>
          <div className="stories-item-resp-book group">
            <svg className="stories-item-bookmark" width="25" height="25">
              <path className="stories-item-bookmark-path" />
            </svg>
            <div className="stories-item-responses">{this.renderResponsesCount()}</div>
          </div>
        </div>
      </li>
    );
  }
};

export default StoriesIndexItem;