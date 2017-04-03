import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchComments } from "../../actions/action_comments";
import CommentsIndexItem from "./comments_index_item.jsx";

class CommentsIndex extends Component {
  constructor() {
    super();
    
    this.state = { display: false }
    this.showComments = this.showComments.bind(this);
  }
  
  showComments() {
    this.setState({ display: true }, () => {
      this.props.fetchComments(this.props.storyId);
    });
  }
  
  displayTextOrComments() {
    if (this.props.comments.length > 0 && this.state.display) {
      const comments = this.props.comments.map((comment, i) => {
        return <CommentsIndexItem key={`comment-${i}`} comment={comment} />
      });
      
      return comments;
    } else if (this.props.hasResponse) {
      return (
        <div onClick={this.showComments} className="comments-show-all">
          <div className="comments-show-all-text">Show all responses</div>
        </div>
      );  
    }
  }
  
  render() {
    console.log("comments index rneder", this.props.comments.length, this.props.comments);
    return (
      <div id="story-comments" className="comments-container padding-side">
        {this.displayTextOrComments()}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComments }, dispatch);
};

function mapStateToProps(state) {
  return { comments: state.comments.all };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndex);