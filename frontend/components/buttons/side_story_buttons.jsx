import React, { Component } from "react";
import Heart from "./heart.jsx";
import Bookmark from "./bookmark.jsx";
import FABLE from "../../utils/definitions";

class SideStoryButtons extends Component {
  constructor() {
    super();
    
    this.state = { style: { position: "fixed" } }
  }
  
  togglePosition() {
    const headerNavbarHeight = FABLE.CSS.headerNavbarHeight;
    const paddingTop = FABLE.CSS.storyContentPaddingTop;
    const bannerImageHeight = $(".story-banner-img").outerHeight();
    const titleHeight = $(".story-title").outerHeight();
    const subtitleHeight = $(".story-subtitle").outerHeight();
    const contentHeight = $(".story-content").outerHeight();
    
    console.log("scrollY", window.scrollY, "height up to content", headerNavbarHeight + paddingTop + titleHeight + subtitleHeight + contentHeight);
    let style;
    // if (window.scrollY >= $(".story-content").height()) {
    // const totalHeight = headerNavbarHeight + paddingTop + titleHeight + subtitleHeight + contentHeight;
      if (bannerImageHeight) { totalHeight += bannerImageHeight }
    //   style = { 
    //     position: "absolute",
    //     top: totalHeight
    //   };
    //   this.setState({ style: style });
    // } else if(window.scrollY < contentHeight)  {
    //   style = { position: "fixed" };
    //   this.setState({ style: style });
    // } 
  }
  
  render() {
    return (
      <div className="side-story-buttons" style={this.state.style}>
        <Heart 
          storyId={this.props.storyId}
          liked={this.props.liked} 
          className="side-story-button" />
        <div className="side-story-likes-count">{this.props.likesCount}</div>
        <Bookmark 
          storyId={this.props.storyId}
          bookmarked={this.props.bookmarked} 
          className="side-story-button" />
      </div>
    );
  }
  
  componentDidMount() {
    const that = this;
    // console.log(document.innerHeight());
    document.addEventListener('scroll', () => {
      that.togglePosition();
      // console.log(window.innerHeight + window.scrollY);
      // if (window.scrollY >= $(".story-content").height()) {
      //   console.log("passed");
      //   that.togglePo
      // }
    });
  }
}

export default SideStoryButtons;