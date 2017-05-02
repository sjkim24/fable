import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchStoriesTagForm } from "../../actions/action_search";
import { fetchOrCreateTag } from "../../actions/action_tag";
import { createTaggings, updateTaggings } from "../../actions/action_taggings";
import { fetchStory } from "../../actions/action_stories";
import Tag from "../buttons/tag.jsx";

class StoriesTagForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
  constructor() {
    super();
    
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
    let tags = JSON.parse(JSON.stringify(this.state.tags));
    if (!tags[desc.toLowerCase()]) {
      tags[desc.toLowerCase()] = id;
    }
    this.setState({ searchTerm: "", tags: tags });
  }
  
  removeTag(desc) {
    let tags = JSON.parse(JSON.stringify(this.state.tags));
    
    delete tags[desc];
    this.setState({ tags: tags });
  }
  
  renderAddedTags() {
    let tags = [];
    for (var desc in this.state.tags) {
      const tagDesc = desc;
      const el = <div
        onClick={() => this.removeTag(tagDesc)} 
        className="stories-form-tag-container" 
        key={`stories-form-tag-${desc}`} >
        <div className="stories-added-tag tag">{desc}</div>
        <div className="stories-form-tag-delete-btn">x</div>
      </div>;
      
      tags.push(el);
    }

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
  
  createStory(event) {
    const isWritingStory = this.props.isWritingStory;
    if (isWritingStory.writing && !isWritingStory.edit) {
      window.createStory(event);
    } else if (isWritingStory.writing && isWritingStory.edit) {
      window.updateStory(event);
      this.props.updateTaggings(Object.values(this.state.tags), this.props.story.id, this.props.token);
      this.props.toggleStoriesTagForm();
      this.props.fetchStory(this.props.story.id)
    }
    // need to reset the state here
  }
  
  goBack() {
    this.props.toggleStoriesTagForm();
    history.back();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.isWritingStory.edit && !this.props.story && nextProps.story) {
      let tags = {};
      nextProps.story.tags.forEach((tag) => {
        tags[tag.tag_desc] = tag.id;
      });
      
      this.setState({ tags: tags });
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
  
  componentDidUpdate(prevProps, prevState) {
    const isWritingStory = this.props.isWritingStory;
    
    if (this.props.active !== prevProps.active && !prevProps.active) {
      document.querySelector(".stories-tag-input").focus();
      // this is triggered after user creates a story
    } else if (isWritingStory.writing && !isWritingStory.edit && this.props.story && !prevProps.story) {
      this.props.createTaggings(Object.values(this.state.tags), this.props.story.id, this.props.token);
      this.props.toggleStoriesTagForm(); // is this working? check
      this.props.fetchStory(this.props.story.id); // fetch to get the new taggings
    }
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    searchStoriesTagForm, fetchOrCreateTag, createTaggings, fetchStory,
    updateTaggings
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