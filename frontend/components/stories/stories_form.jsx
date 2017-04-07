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
    this.handleFilePreview = this.handleFilePreview.bind(this);
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
  
  handleFilePreview(event) {
    event.persist();
    this.setState({ imgPrevLoaded: false }, () => {
      const file = event.target.files[0];
      let fileReader = new FileReader();

      fileReader.readAsDataURL(file);   
      fileReader.onloadend = () => {
        this.setState({ imgPrevLoaded: true, imgPrevUrl: fileReader.result, file: file });
      };
    });
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    // validate and error check first
    if (this.state.imgPrevLoaded) {
      const formData = new FormData();
      formData.append("story[title]", this.state.title);
      formData.append("story[subtitle]", this.state.subtitle);
      formData.append("story[content]", this.state.content);
      formData.append("story[banner_image]", this.state.file);
      
      this.props.createStory(formData);
    }
  }
  
  render() {
    const prevDisplay = this.state.imgPrevLoaded ? "" : "hidden";
    
    return (
      <form onSubmit={this.handleOnSubmit} className="stories-form">
        <input
          className="stories-form-input stories-form-input-title padding-side" 
          name="story[title]" 
          placeholder="Title" 
          onChange={(event) => this.handleOnChange(event, "title")} />
        <input
          className="stories-form-input stories-form-input-subtitle padding-side" 
          name="story[subtitle]" 
          placeholder="Subtitle"
          onChange={(event) => this.handleOnChange(event, "subtitle")} />
        <div className="stories-form-banner-img-input-container">
          <label htmlFor="file-input">
            <img 
              src="/images/icons/camera.png"
              alt="camera img" 
              className="stories-form-camera-img img-prev-camera-img" />
            <input
              id="file-input"
              onChange={this.handleFilePreview} 
              type="file" 
              name="story[banner_image]" 
              className="stories-form-file-input hidden" />
          </label>
          <img 
            src={this.state.imgPrevUrl} 
            alt="preview img" 
            className={`stories-form-preview-img ${prevDisplay}`} />
        </div>
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