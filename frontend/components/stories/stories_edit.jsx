import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory } from "../../actions/action_stories";
import ContentForm from "../base/content_form.jsx";

class StoriesEdit extends Component {
  constructor() {
    super();
    
    this.state = { 
      title: "",
      subtitle: "",
      content: ""
    };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.formattedContent = this.formattedContent.bind(this);
    this.handleContentFormChange = this.handleContentFormChange.bind(this);
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
  }
  
  formattedContent() {
    return JSON.parse(this.props.story.content);
  }
  
  componentWillMount() {
    this.props.fetchStory(this.props.params.storyId)
    .then(() => {
      const contentForm = document.querySelector(".stories-edit-form .content-form");
      const content = JSON.parse(this.props.story.content);
      contentForm.innerText = content;
      
      this.setState({
        title: this.props.story.title,
        subtitle: this.props.story.subtitle,
        content: content
      })
    })
  }
  
  handleContentFormChange(content) {
    this.setState({ content: content });
  }
  
  render() {
    if (!this.props.story) {
      return <div className="loader" />;
    }
    console.log(this.props.story);
    return (
      <div>
        <form className="stories-edit-form" onSubmit={this.handleOnSubmit}>
          <input 
            value={this.state.title} />
          <input 
            value={this.state.subtitle} />
          <ContentForm handleContentFormChange={this.handleContentFormChange} />
        </form>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStory }, dispatch);
};

function mapStateToProps(state) {
  return {
    story: state.stories.story
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesEdit);