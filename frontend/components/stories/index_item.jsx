import React, { Component } from 'react';

class StoriesIndexItem extends Component {
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
      
      return <p className="story-snippet">{`${content} ...`}</p>;
    }
  }
  
  renderSubtitle() {
    if (this.props.story.subtitle) {
      return <h4 className="story-subtitle">subtitle</h4>;
    }
  }
  
  renderBannerImg() {
    if (this.props.story.user_image_url) {
      return <img src={`${this.props.story.user_image_url}`} className="story-banner-img"/>;
    }
  }
  
  render() {
    return (
      <li className="story">
        <div className="story-header">
          <img src={this.props.story.user_image_url} className="story-user-img" />
          <a href="">{this.props.story.username}</a>
          <div className="story-published-date">{this.props.story.published_date}</div>
          <div className="story-kdot">{"\u2022"}</div>
          <div className="story-read-time">{this.props.story.read_time}</div>
        </div>
        <div className="story-details">
          <h3 className="story-title">story title</h3>
          {this.renderSubtitle()}
          {this.renderBannerImg()}
          {this.renderSnippet()}
        </div>
        <div className="story-footer">
          <div className="story-like">
            <div>Heart</div>
            <div>{this.props.story.likes_count}</div>
          </div>
          <div className="story-resp-book">
            <div>{this.props.comments_count}</div>
            <div>Bookmark</div>
          </div>
        </div>
      </li>
    );
  }
};

export default StoriesIndexItem;