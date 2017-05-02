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
    
    this.state = { searchTerm: "", addedTagDescs: [], addedTagIds: [] };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.createStory = this.createStory.bind(this);
    this.goBack = this.goBack.bind(this);
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
    const ids = this.state.addedTagIds.concat(id);
    const descs = this.state.addedTagDescs.concat(desc);
    
    this.setState({ searchTerm: "", addedTagIds: ids, addedTagDescs: descs });
  }
  
  renderAddedTags() {
    if (this.props.story) {
      const taggedTags = this.props.story.tags.map((tag, i) => {
        return (
          <Tag key={`stories-form-tagged-tag-${i}`}
            desc={tag.tag_desc}
            className="stories-added-tag" />
        );
      });
    }
    
    const tags = this.state.addedTagDescs.map((tagDesc, i) => {
      return (
        <Tag 
          key={`stories-form-tag-${i}`} 
          desc={tagDesc} 
          className="stories-added-tag" />
      );
    });

    const allTags = this.props.story ? tags.concat(taggedTags) : tags;
    // 
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
    if (!prevProps.active) {
      document.querySelector(".stories-tag-input").focus();
    } else if (this.props.story && !prevProps.story) {
      this.props.createTaggings(this.state.addedTagIds, this.props.story.id, this.props.token);
      this.props.toggleStoriesTagForm();
      this.props.fetchStory(this.props.story.id);
    }
  }
  
  render() {    
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
    isEditingStory: state.stories.isEditingStory,
    searchedTags: state.search.storiesTagFormSearch, 
    story: state.stories.story,
    token: state.auth.authToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesTagForm);