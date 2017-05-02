import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchStoriesTagForm } from "../../actions/action_search";
import { fetchOrCreateTag } from "../../actions/action_tag";
import { createTaggings } from "../../actions/action_taggings";
import { fetchStory } from "../../actions/action_stories";
import Tag from "../buttons/tag.jsx";

class StoriesTagForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  constructor() {
    super();
    
    // this.state = { searchTerm: "", addedTagDescs: [], addedTagIds: [] };
    this.state = { searchTerm: "", tags: {} };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.createStory = this.createStory.bind(this);
    this.goBack = this.goBack.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ searchTerm: event.target.value }, () => {
      this.props.searchStoriesTagForm(this.state.searchTerm);
    });
  }
  
  renderSearchedTags() {
    const that = this;
    const tags = this.props.searchedTags.map((tag, i) => {
      return (
        <li
          onClick={() => this.addTag(tag.id, tag.tag_desc)} 
          className="stories-searched-tag group"
          key={`stories-tag-form-tag-${i}`}>
          <div className="stories-tag-desc">{tag.tag_desc}</div>
          <div className="stories-tag-count">({tag.tag_count})</div>
        </li>
      );
    });
    
    return tags;
  }
  
  addTag(id, desc) {
    let tags = JSON.parse(JSON.stringify(this.state.tags))
    if (!tags[id]) {
      tags[id] = desc;
    }
    debugger
    this.setState({ searchTerm: "", tags: tags }, () => {
      debugger
    });
  }
  
  removeTag() {
    
  }
  
  renderAddedTags() {
    let taggedTags;
    if (this.props.story) {
      taggedTags = this.props.story.tags.map((tag, i) => {
        return (
          <div className="stories-form-tag-container group" key={`stories-form-tagged-tag-${i}`}>
            <div className="stories-added-tag tag">{tag.tag_desc}</div>
            <div className="stories-form-tag-delete-btn">x</div>
          </div>
        );
      });
    }
    
    let tags = [];
    for (var id in this.state.tags) {
      // prop = id, value = desc
      const el = <div
        className="stories-form-tag-container group" key={`stories-form-tag-${id}`} >
        <div className="stories-added-tag tag">{this.state.tags[id]}</div>
        <div
          onClick={this.removeTag} 
          className="stories-form-tag-delete-btn">
          x
        </div>
      </div>;
      
      tags.push(el);
    }
  
    let allTags;
    
    if (this.props.story) {
      allTags = tags.concat(taggedTags);
    } else {
      allTags = tags;
    }
    
    // debugger
    return allTags;
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    const that = this;
    this.props.fetchOrCreateTag(this.state.searchTerm)
    .then((response) => {
      const data = response.payload.data;
      that.addTag(data.id, data.tag_desc);
    });
  }
  
  createStory(event) {
    window.createStory(event);
  }
  
  goBack() {
    this.props.toggleStoriesTagForm();
    history.back();
  }
  
  componentDidUpdate(prevProps, prevState) {
    const isWritingStory = this.props.isWritingStory;
    if (this.props.active !== prevProps.active && !prevProps.active) {
      document.querySelector(".stories-tag-input").focus();
    } else if (isWritingStory.writing && !isWritingStory.edit && this.props.story && !prevProps.story) {
      this.props.createTaggings(Object.keys(this.state.tags), this.props.story.id, this.props.token);
      this.props.toggleStoriesTagForm();
      this.props.fetchStory(this.props.story.id);
    }
  }
  
  render() {   
    if (this.props.isWritingStory.edit && !this.props.story) {
      return <div className="loader" />;
    }
    
    const display = this.props.active ? "" : "hidden";

    return (
      <div className={`stories-tag-form-container card ${display}`}>
        <div className="stories-tag-form-header">Ready to publish?</div>
        <div className="stories-tag-form-subheader">
          Add or change tags (up to 5) so your story reaches more people:
        </div>
        <form onSubmit={this.handleOnSubmit} className="stories-tag-form">
          <input
            onChange={this.handleOnChange}
            className="stories-tag-input" 
            placeholder="Add tag"
            value={this.state.searchTerm} />
          <input
            type="submit"
            value="+" 
            className="stories-tag-submit" />
        </form>
        <ul className="stories-tag-form-searched-tags group">
          {this.renderSearchedTags()}
        </ul>
        <ul className="stories-tag-form-added-tags group">
          {this.renderAddedTags()}
        </ul>
        <div className="stories-tag-form-buttons group">
          <div onClick={this.createStory} className="stories-tag-form-button button">
            Publish
          </div>
          <div 
            className="stories-tag-form-button button" 
            onClick={this.goBack}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    searchStoriesTagForm, fetchOrCreateTag, createTaggings, fetchStory 
  }, dispatch);
};

function mapStateToProps(state) {
  return {
    isWritingStory: state.stories.isWritingStory,
    searchedTags: state.search.storiesTagFormSearch, 
    story: state.stories.story,
    token: state.auth.authToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesTagForm);