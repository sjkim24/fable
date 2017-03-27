import React, { Component } from "react";
import CommentsIndexItem from "./index_item.jsx";

class CommentsIndex extends Component {
  constructor() {
    super();
    
    this.state = { display: false }
    this.showComments = this.showComments.bind(this);
  }
  
  showComments() {
    this.setState({ display: true });
  }
  
  displayTextOrComments() {
    if (this.state.display) {
      const comments = this.props.comments.map((comment, i) => {
        return <CommentsIndexItem key={`comment-${i}`} comment={comment} />
      });
      
      return comments;
    } else {
      return (
        <div onClick={this.showComments} className="comments-show-all">
          <div className="comments-show-all-text">Show all responses</div>
        </div>
      );  
    }
  }
  
  render() {
    return (
      <div id="story-comments" className="comments-container padding-side">
        {this.displayTextOrComments()}
      </div>
    );
  }
};

export default CommentsIndex;