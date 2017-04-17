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
      userTags: [] 
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.createTagFollow = this.createTagFollow.bind(this);
    this.searchTags = this.searchTags.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ searchTerm: event.target.value }, () => {
      this.searchTags();
    });
  }
  
  searchTags() {
    this.props.searchTags(this.state.searchTerm);
  }
  
  renderSearchedTags() {
    const that = this;
    const tags = this.props.searchedTags.map((tag, i) => {
      let data = {};
      data["authenticity_token"] = that.props.token;
      data["tag_id"] = tag.id;
      
      return (
        <li
          onClick={() => this.props.createTagFollow(data)} 
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
  
  createTagFollow() {
    // event.preventDefault();
    // event.persist();
    // check to make sure i'm not adding a tag following i already have
    const data = {};
    const that = this;
    
    if (this.props.searchedTags[0]) {
      data["tag_id"] = this.props.searchedTags[0].id;
    } else {
      data["tag_desc"] = this.state.searchTerm;
    }
    
    data["authenticity_token"] = this.props.token;
    
    this.props.createTagFollow(data)
    .then(() => {
      this.searchTags();
      this.props.fetchTagFollows();
    })
  }
  
  componentWillMount() {
    this.props.fetchTagFollows();
  }
  
  render() {
    if (!this.props.currentUser || !this.props.tagFollows) {
      return <div className="loader" />;
    }
    
    console.log(this.props.searchedTags[0]);
    // console.log(this.props.tagFollows);
    return (
      <div className="user-tag-follows padding-side">
        <div className="user-tag-follows-inner-container">
          <div className="user-tag-follows-header">Your Tag Follows</div>
          <form onSubmit={this.createTagFollow} className="tag-follows-form">
            <input
              className="tag-follows-search-input" 
              onChange={this.handleOnChange}
              value={this.state.searchTerm} 
              placeholder="Search tags" />
            <input
              type="submit"
              value="+"
              className="tag-follows-search-add" />
          </form>
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