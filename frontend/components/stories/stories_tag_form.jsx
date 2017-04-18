import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchTags } from "../../actions/action_search";

class StoriesTagForm extends Component {
  constructor() {
    super();
    
    this.state = { searchTerm: "" };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ searchTerm: event.target.value }, () => {
      this.props.searchTags(this.state.searchTerm);
    });
  }
  
  renderSearchedTags() {
    const that = this;
    const tags = this.props.searchedTags.map((tag, i) => {
      return (
        <li
          onClick={(event) => this.createTagFollow(event, tag.id)} 
          className="tag-follows-searched-tag group"
          key={`searched-tag-${i}`}>
          <div className="searched-tag-desc">{tag.tag_desc}</div>
          <div className="searched-tag-count">({tag.tag_count})</div>
        </li>
      );
    });
    
    return tags;
  }
  
  renderAddedTags() {
    
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    // call window.createStory();
    console.log("stories tag form submit clicked");
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
        <div className="stories-tag-form-publish button">
          Publish
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchTags }, dispatch);
};

function mapStateToProps(state) {
  return {
    searchedTags: state.search.tags
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesTagForm);