import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/action_modal";
import { fetchComments } from "../../actions/action_comments";
import ContentForm from "../base/content_form.jsx";

class CommentForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      active: false,
      rejectList: {
        "comment-form": true,
        "comment-form-user-inst-container": true,
        "comment-content-form": true,
        "comment-form-buttons-container": true
      }
    };
    this.checkAuthThenToggle = this.checkAuthThenToggle.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
  }
  
  checkAuthThenToggle() {
    if (this.props.currentUser) {
      this.toggleActive();
    } else {
      this.props.toggleModal("auth-selections");
    }
  }
  
  toggleActive() {
    // debugger
    if (!this.state.active) {
      // console.log("hit");
      this.setState({ active: true });
    }
  }
  
  handleOnInput(content) {
    this.setState({ content: content }, () => { 
      if (this.state.error && content.length > 0) {
        this.setState({ error: false });
      }
    });
  }

  renderContentForm() {
    if (this.state.active) {
      return <ContentForm handleOnInput={this.handleOnInput} />;
    }
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    const that = this;
    
    if (!this.state.content || this.state.content.length === 0) {
      // handle errors here. as long as i take care of different situations where 
      // i have to pass parent_comment_id, error should only occur when 
      // content presence validation fails
      this.setState({ error: true });
    } else {
      // pass story id and params to createComment
      // for now, i'm not checking parent commend id but do check it for reply create
      const request = axios.post(`/api/stories/${this.props.storyId}/comments`,{ 
        comment: { content: this.state.content } 
      })
      .then(function(response) {
        // fetch comments after
        that.setState({ active: false }, () => {
          that.props.fetchComments(that.props.storyId);
        });
        
        // debugger
      })
      .catch(function(error) {
        debugger
        console.log(error);
      });
    }
    console.log("submitted!");
  }
  
  goFullScreen() {
    console.log("go full screen!");
  }
  
  render() {
    const instClass = this.state.active ? "comment-form-inst-hide" : "";
    const usernameClass = this.state.active ? "comment-form-username-show" : "";
    const contentFormDisplay = this.state.active ? "" : "hidden";
    const contentFromErrorDisplay = this.state.error ? "" : "hidden";
    
    return (
      <form onSubmit={this.handleOnSubmit} className="comment-form">
        <div 
          className="comment-form-user-inst-container group" 
          onClick={this.checkAuthThenToggle}>
          <img src={this.props.userImgUrl} 
            alt="user img" 
            className="comment-form-user-img"/>
          <div className={`comment-form-inst ${instClass}`}>
            Write a response...
          </div>
          <div className={`comment-form-username ${usernameClass}`}>
            {this.props.userFullName}
          </div>
        </div>
        <div className={`comment-content-form ${contentFormDisplay}`}>
          {this.renderContentForm()}
          <div className="comment-form-buttons-container group">
            <input className="comment-submit" type="submit" value="Publish" />
            <div onClick={this.goFullScreen} className="comment-go-full">
              Go Fullscreen
            </div>
            <div className={`content-form-error error ${contentFromErrorDisplay}`}>
              Content form cannot be blank
            </div>
          </div>
        </div>
      </form>
    );
  }
  
  componentDidMount() {
    const that = this;
    
    document.body.addEventListener("click", (event) => {
      let klass;
      
      if (event.target.classList[0] === "comment-form") {
        klass = "comment-form";
      } else {
        klass = event.target.parentNode.classList[0];
      }

      if (that.state.active && !that.state.rejectList[klass]) {
        that.setState({ active: false });
      }
    });
  }
  
  componentWillUnmount() {
    document.body.removeEventListener("click", () => {
      return;
    });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal, fetchComments }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);