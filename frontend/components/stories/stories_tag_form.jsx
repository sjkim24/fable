import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchStoriesTagForm } from "../../actions/action_search";
import { fetchOrCreateTag } from "../../actions/action_tag";
import Tag from "../buttons/tag.jsx";

class StoriesTagForm extends Component {
  constructor() {
    super();
    
    this.state = { searchTerm: "", addedTagDescs: [], addedTagIds: [] };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.createStory = this.createStory.bind(this);
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
    
    this.setState({ addedTagIds: ids, addedTagDescs: descs });
  }
  
  renderAddedTags() {
    const tags = this.state.addedTagDescs.map((tagDesc, i) => {
      return (
        <Tag 
          key={`stories-form-tag-${i}`} 
          desc={tagDesc} 
          className="stories-added-tag" />
      );
    });
    
    return tags;
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
  
  createStory() {
    // but i also need to somehow pass my tag ids to create taggings
    // window.createStory();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.active) {
      document.querySelector(".stories-tag-input").focus();
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
        <div onClick={this.createStory} className="stories-tag-form-publish button">
          Publish
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchStoriesTagForm, fetchOrCreateTag }, dispatch);
};

function mapStateToProps(state) {
  return {
    searchedTags: state.search.storiesTagFormSearch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesTagForm);