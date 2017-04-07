import React, { Component } from "react";
import Heart from "./heart.jsx";
import Bookmark from "./bookmark.jsx";
import FABLE from "../../utils/definitions";

class SideStoryButtons extends Component {
  constructor() {
    super();
    
    this.state = { style: {}, active: false, settingDim: false };
    this.togglePosition = this.togglePosition.bind(this);
  }
  
  setDimensions() {
    const that = this;
    
    $(".story-banner-img")[0].onload = function() {
      const headerNavbarHeight = FABLE.CSS.headerNavbarHeight;
      const paddingTop = FABLE.CSS.storyContentPaddingTop;
      const btnsHeight = $(".side-story-buttons").outerHeight();
      const heightB4Btns = window.innerHeight / 2 - btnsHeight;
      const headerHeight = $(".story-header").outerHeight();
      const bannerImgHeight = $(".story-banner-img").outerHeight() || 0;
      const titleHeight = $(".story-title").outerHeight();
      const subtitleHeight = $(".story-subtitle").outerHeight() || 0;
      const heightB4Content = headerNavbarHeight + paddingTop + headerHeight + bannerImgHeight + titleHeight + subtitleHeight;
      const contentHeight = $(".story-content").outerHeight();
      
      that.setState({
        headerNavbarHeight: headerNavbarHeight,
        paddingTop: paddingTop,
        btnsHeight: btnsHeight,
        heightB4Btns: heightB4Btns,
        headerHeight: headerHeight,
        bannerImgHeight: bannerImgHeight,
        titleHeight: titleHeight,
        subtitleHeight: subtitleHeight,
        heightB4Content: heightB4Content,
        contentHeight: contentHeight,
        dimensionsSet: true,
        settingDim: false
      });
    }
  }
  
  togglePosition() {
    if (!this.state.dimensionsSet && window.innerWidth >= 1000) {
      this.setDimensions();
    } else if (this.state.dimensionsSet && window.innerWidth >= 1000) { 
      if (window.scrollY + this.state.heightB4Btns < this.state.heightB4Content + 7) { // add 50px to trigger the blur out faster
        // above content height
        this.setState({ active: false });
      } else if ((window.scrollY + window.innerHeight / 2) >= (this.state.heightB4Content + this.state.contentHeight)) {
        // past content height
        const totalHeight = this.state.heightB4Content + this.state.contentHeight - this.state.btnsHeight;;
        this.setState({ style: { display: "block", position: "absolute", top: `${totalHeight}px`, visibility: "visible"} })
      } else if ((window.scrollY + this.state.heightB4Btns >= this.state.heightB4Content + 7)
        && (window.scrollY + this.state.heightB4Btns < this.state.heightB4Content + this.state.contentHeight)) {
        // in between content height
        this.setState({ style: { display: "block", position: "fixed", visibility: "visible" }, active: true });
      }
    }
  }
  
  render() {
    const active = this.state.active ? "active" : "inactive";
    
    return (
      <div 
        className={`side-story-buttons side-story-buttons-${active}`}
        style={this.state.style}>
        <Heart
          name="storiesShow" 
          storyId={this.props.storyId}
          liked={this.props.liked} 
          className="side-story-button" />
        <div className="side-story-likes-count">{this.props.likesCount}</div>
        <Bookmark
          name="storiesShow"  
          storyId={this.props.storyId}
          bookmarked={this.props.bookmarked} 
          className="side-story-button" />
      </div>
    );
  }
  
  componentDidMount() {
    document.addEventListener('scroll', this.togglePosition);
    if (window.innerWidth >= 1000) { this.setDimensions(); }
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.togglePosition);
  }
}

export default SideStoryButtons;