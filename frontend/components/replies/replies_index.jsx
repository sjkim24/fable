import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import Heart from "../buttons/heart.jsx";
import { fetchReplies } from "../../actions/replies_fetch";
import RepliesIndexItem from "./replies_index_item.jsx";

class RepliesIndex extends Component {
  constructor() {
    super();
    
    this.state = { display: false }
    this.resetState = this.resetState.bind(this);
    this.showReplies = this.showReplies.bind(this);
  }
  
  resetState() {
    window.scrollTo(0, 0);
    this.setState({ display: false });
  }
  
  showReplies() {
    this.setState({ display: true }, () => {
      this.props.fetchReplies(this.props.commentId);
    });
  }
  
  displayTextOrComments() {
    if (this.props.replies.length > 0 && this.state.display) {
      const replies = this.props.replies.map((reply, i) => {
        return <RepliesIndexItem
          resetState={this.resetState} 
          key={`comment-${i}`} 
          reply={reply} />
      });
      
      return replies;
    } else if (this.props.hasReplies) {
      return (
        <div onClick={this.showReplies} className="comments-show-all">
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchReplies }, dispatch);
};

function mapStateToProps(state) {
  return { replies: state.replies.all };
};

export default connect(mapStateToProps, mapDispatchToProps)(RepliesIndex);