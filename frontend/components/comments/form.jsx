import React, { Component } from "react";
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
    this.toggleActive = this.toggleActive.bind(this);
    this.renderInstOrUsername = this.renderInstOrUsername.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
  }
  
  toggleActive() {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  }
  
  renderInstOrUsername() {
    if (this.state.active) {
      return (
        <div className="comment-form-username">
          {this.props.userFullName}
        </div>
      );
    } else {
      return (
        <div className="comment-form-inst">
          Write a response...
        </div>
      );
    }
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    console.log("submitted!");
  }
  
  goFullScreen() {
    console.log("go full screen!");
  }
  
  render() {
    const instClass = this.state.active ? "comment-form-inst-hide" : "";
    const usernameClass = this.state.active ? "comment-form-username-show" : "";
    const contentFormDisplay = this.state.active ? "" : "hidden";

    return (
      <form onSubmit={this.handleOnSubmit} className="comment-form">
        <div className="comment-form-user-inst-container group" onClick={this.toggleActive}>
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
          <ContentForm />
          <div className="comment-form-buttons-container group">
            <input className="comment-submit" type="submit" value="Publish" />
            <div onClick={this.goFullScreen} className="comment-go-full">
              Go Fullscreen
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

// textarea should be change to 

export default CommentForm;