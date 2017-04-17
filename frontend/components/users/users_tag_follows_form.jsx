import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTagFollows, createTagFollow } from "../../actions/action_user";
import { searchTags } from "../../actions/action_search";
import TagDelete from "../buttons/tag_delete.jsx";

class UsersTagFollowsForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      searchTerm: "",
      searchedTags: [],
      error: false
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.createTagFollow = this.createTagFollow.bind(this);
    this.searchTags = this.searchTags.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ searchTerm: event.target.value, error: false }, () => {
      this.searchTags();
    });
  }
  
  searchTags() {
    this.props.searchTags(this.state.searchTerm);
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
  
  renderFollowingTags() {
    const tags = this.props.tagFollows.map((tag, i) => {
      return (
        <TagDelete
          id={tag.id}
          className="tag-follows-following-tag" 
          key={`following-tag-${i}`} 
          desc={tag.tag_desc} 
          searchTags={this.searchTags} />
      ); 
    });
    
    return tags;
  }
  
  createTagFollow(event, tagId) {
    event.persist();
    
    this.setState({ error: false }, () => {
      const data = {};
      const that = this;
      
      if (tagId) {
        data["tag_id"] = tagId
      } else {
        data["tag_desc"] = this.state.searchTerm;
      }
      
      data["authenticity_token"] = this.props.token;
      
      this.props.createTagFollow(data)
      .then((response) => {
        const error = response.payload.data.error ? true : false;
        this.setState({ error: error }, () => {
          this.searchTags();
          this.props.fetchTagFollows();
        });
      });
    });
  }
  
  componentWillMount() {
    this.props.fetchTagFollows();
  }
  
  render() {
    if (!this.props.currentUser || !this.props.tagFollows) {
      return <div className="loader" />;
    }

    const errorDisplay = this.state.error ? "" : "hidden";
    
    return (
      <div className="user-tag-follows padding-side">
        <div className="user-tag-follows-inner-container">
          <div className="user-tag-follows-header">Your Tag Follows</div>
          <form 
            onSubmit={(event) => this.createTagFollow(event, null)} 
            className="tag-follows-form">
            <input
              className="tag-follows-search-input" 
              onChange={this.handleOnChange}
              value={this.state.searchTerm} 
              placeholder="Search tags"
              autoFocus />
            <input
              type="submit"
              value="+"
              className="tag-follows-search-add" />
          </form>
          <div className={`tag-follows-error error ${errorDisplay}`}>
            You are already following this tag
          </div>
          <ul className="tag-follows-searched-tags group">
            {this.renderSearchedTags()}
          </ul>
          <ul className="tag-follows-following-tags group">
            {this.renderFollowingTags()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTagFollows, searchTags, createTagFollow }, dispatch);
};

function mapStateToProps(state) {
  return { 
    currentUser: state.auth.currentUser, tagFollows: state.user.tagFollows,
    searchedTags: state.search.tags, token: state.auth.authToken
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTagFollowsForm)