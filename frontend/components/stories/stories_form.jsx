import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContentForm from "../base/content_form.jsx";
import { createStory } from "../../actions/action_stories";

class StoriesForm extends Component {
  constructor() {
    super();
    
    this.state = {
      title: "",
      subtitle: "",
      content: ""
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleContentFormChange = this.handleContentFormChange.bind(this);
  }
  
  handleOnChange(event, type) {
    switch(type) {
      case("title"):
        this.setState({ title: event.target.value });
        break;
      case("subtitle"):
        this.setState({ subtitle: event.target.value });
        break;
    };
  }
  
  handleContentFormChange(content) {
    this.setState({ content: content });
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    // validate and error check first
    // call create story action
    const fileSelect = document.querySelector(".story-banner-img-file-select");
    const files = fileSelect.files;
    const file = files[0];
    
    const formData = new FormData();
    formData.append("story[title]", this.state.title);
    formData.append("story[subtitle]", this.state.subtitle);
    formData.append("story[content]", this.state.content);
    formData.append("story[banner_image]", file);
    
    this.props.createStory(formData);
    debugger
  }
  
  render() {
    // console.log(this.state.content);
    return (
      <form onSubmit={this.handleOnSubmit} className="stories-form">
        <div className="stories-form-banner-img-input-container">
          <img 
            src="/images/icons/camera.png"
            alt="camera img" 
            className="stories-form-camera-img" />
          <input type="file" name="story[banner_image]" className="story-banner-img-file-select" />
        </div>
        <input
          className="story-form-input story-form-input-title" 
          name="story[title]" 
          placeholder="Title" 
          onChange={(event) => this.handleOnChange(event, "title")} />
        <input
          className="story-form-input story-form-input-subtitle" 
          name="story[subtitle]" 
          placeholder="Subtitle"
          onChange={(event) => this.handleOnChange(event, "subtitle")} />
        <ContentForm handleContentFormChange={this.handleContentFormChange} />
        <input type="submit" value="Publish" className="button" />
      </form>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createStory}, dispatch);
};

export default connect(null, mapDispatchToProps)(StoriesForm);