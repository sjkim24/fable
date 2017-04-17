import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTagFollows } from "../../actions/action_user";
import { searchTags } from "../../actions/action_search";
import Tag from "../buttons/tag.jsx";

class UsersTagFollowsForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      searchTerm: "",
      searchedTags: [],
      userTags: [] 
    };
    
    // this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ searchTerm: event.target.value }, () => {
      this.props.searchTags(this.state.searchTerm);
    });
  }
  
  renderSearchedTags() {
    const tags = this.props.searchedTags.map((tag, i) => {
      return (
        <li 
          className="tag-follows-searched-tag"
          key={`searched-tag-${i}`}>
          {tag.tag_desc}
        </li>
      );
    });
    
    return tags;
  }
  
  renderFollowingTags() {
    const tags = this.props.tagFollows.map((tag, i) => {
      return <Tag key={`following-tag-${i}`} desc={tag.tag_desc} />
    });
    
    return tags;
  }
  // 
  // handleOnSubmit(event) {
  //   event.preventDefault();
  //   console.log("submit clicked!");
  // }
  // 
  componentWillMount() {
    this.props.fetchTagFollows();
  }
  
  render() {
    if (!this.props.currentUser || !this.props.tagFollows) {
      return <div className="loader" />;
    }
    
    console.log(this.props.searchedTags);
    console.log(this.props.tagFollows);
    return (
      <div className="user-tag-follows">
        <ul className="tag-follows-searched-tags">
          {this.renderSearchedTags()}
        </ul>
        <form className="tag-follows-form">
          <input
            className="tag-follows-search-input" 
            onChange={this.handleOnChange}
            value={this.state.searchTerm} 
            placeholder="Search tags" />
        </form>
        <ul className="tag-follows-following-tags">
          {this.renderFollowingTags()}
        </ul>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTagFollows, searchTags }, dispatch);
};

function mapStateToProps(state) {
  return { 
    currentUser: state.auth.currentUser, tagFollows: state.user.tagFollows,
    searchedTags: state.search.tags
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTagFollowsForm)