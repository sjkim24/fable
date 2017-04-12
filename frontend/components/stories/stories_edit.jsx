import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory } from "../../actions/action_stories";
import ContentForm from "../base/content_form.jsx";

class StoriesEdit extends Component {
  constructor() {
    super();
    
    this.state = { title: "", subtitle: "", content: "" };
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleContentFormChange = this.handleContentFormChange.bind(this);
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
  }
  
  componentWillMount() {
    const that = this;
    this.props.fetchStory(this.props.params.storyId)
    .then(() => {
      const contentForm = document.querySelector(".stories-edit-form .content-form");
      const content = JSON.parse(this.props.story.content);
      contentForm.innerText = content;

      this.setState({
        title: this.props.story.title,
        subtitle: this.props.story.subtitle || "",
        content: content
      })
    })
  }
  
  handleContentFormChange(content) {
    this.setState({ content: content });
  }
  
  render() {
    const story = this.props.story;
    const currentUser = this.props.currentUser;
    
    if (!story) {
      return <div className="loader" />;
    } 
    // else if (!currentUser || currentUser.id !== story.userId) {
    //   return (
    //     <NotAllowed />
    //   )
    // }

    return (
      <div>
        <form className="stories-edit-form" onSubmit={this.handleOnSubmit}>
          <input
            placeholder="Title" 
            value={this.state.title} />
          <input
            placeholder="Subtitle" 
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
  return { story: state.stories.story, currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesEdit);