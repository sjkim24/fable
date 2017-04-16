import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ContentForm from "../base/content_form.jsx";
import { createStory } from "../../actions/action_stories";

class StoriesForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  
  constructor() {
    super();
    
    this.state = { title: "", subtitle: "", content: "", imgPrevLoaded: null };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleContentFormChange = this.handleContentFormChange.bind(this);
    this.handleFilePreview = this.handleFilePreview.bind(this);
    this.goBack = this.goBack.bind(this);
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
        this.setState({ 
          imgPrevLoaded: true, imgPrevUrl: fileReader.result, file: file 
        });
      };
    });
  }
  
  validInputs() {
    return this.state.title.length > 0 && this.state.content.length > 0 ? true : false;
  }
  
  handleOnSubmit(event) {
    event.preventDefault();

    if (this.validInputs() && (this.state.imgPrevLoaded === null || this.state.imgPrevLoaded)) {
      const formData = new FormData();
      formData.append("story[title]", this.state.title);
      formData.append("story[subtitle]", this.state.subtitle);
      formData.append("story[content]", this.state.content);
      if (this.state.file) {
        formData.append("story[banner_image]", this.state.file);
      }
      console.log(this.props.token);
      formData.append("authenticity_token", this.props.token);
      
      this.props.createStory(formData)
        .then(() => {
          this.context.router.push(`/stories/${this.props.story.id}`);
        });
    } else {
      // render error
      console.log("render error");
    }
  }
  
  goBack() {
    history.back();
  }
  
  render() {
    if (!this.props.currentUser) {
      return <div className="loader" />;
    }
    
    const prevDisplay = this.state.imgPrevLoaded ? "" : "hidden";
    const instDisplay = this.state.imgPrevLoaded ? "hidden" : "";
    const currentUser = this.props.currentUser;
    
    return (
      <div className="stories-form-container">
        <div className="stories-form-user-header padding-side group">
          <img src={currentUser.user_image_url} alt="user image" className="user-header-img" />
          <div className="user-header-info">
            <div className="user-header-fullname">{currentUser.fullname}</div>
            <div className="user-header-user-desc">{currentUser.user_desc}</div>
            <div className="user-header-draft">Draft</div>
          </div>
        </div>
        <form onSubmit={this.handleOnSubmit} className="stories-form">
          <div className="stories-form-input-container padding-side">
            <input
              className="stories-form-input stories-form-input-title" 
              name="story[title]" 
              placeholder="Title"
              value={this.state.title} 
              onChange={(event) => this.handleOnChange(event, "title")} />
            <input
              className="stories-form-input stories-form-input-subtitle" 
              name="story[subtitle]" 
              placeholder="Subtitle"
              value={this.state.subtitle} 
              onChange={(event) => this.handleOnChange(event, "subtitle")} />
          </div>
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
              <div className={`stories-form-img-inst ${instDisplay}`}>
                Add a banner image
              </div>
            </label>
            <img 
              src={this.state.imgPrevUrl} 
              alt="preview img" 
              className={`stories-form-preview-img ${prevDisplay}`} />
          </div>
          <ContentForm handleContentFormChange={this.handleContentFormChange} />
          <div className="stories-form-btns group padding-side">
            <input type="submit" value="Publish" className="stories-form-submit-btn button" />
            <div 
              className="stories-form-cancel-btn button" 
              onClick={this.goBack}>
              Cancel
            </div>
          </div>
        </form>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createStory }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser, story: state.stories.story, token: state.auth.authToken }
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesForm);