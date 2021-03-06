import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchAll } from "../../actions/action_search";
import SearchIndexStoryItem from "./search_index_story_item.jsx";
import SearchIndexUserItem from "./search_index_user_item.jsx";
import Tag from "../buttons/tag.jsx";

class SearchIndex extends Component {
  constructor() {
    super();
    
    this.state = { 
      activeTab: "stories",
      searchTerm: "",
      queryString:  location.hash.replace("#/search", "")
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.search = this.search.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  
  search() {
    this.props.searchAll(this.state.searchTerm);
  }
  
  toggleActiveTab(tab) {
    this.setState({ activeTab: tab });
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.state.queryString !== nextProps.location.search) {
      this.setState({ queryString: nextProps.location.search}, () => {
        this.props.searchAll(nextProps.location.search.replace("?q=", ""));
      });
    }
  }
  
  renderActiveTab() {
    switch(this.state.activeTab) {
      case("stories"):
        if (this.props.searchResults.stories.length === 0) {
          return <div className="search-no-result">No result matched your search</div>;
        }
      
        const stories = this.props.searchResults.stories.map((story, i) => {
          return (
            <SearchIndexStoryItem
              key={`search-story-item-${i}`} 
              story={story} />
          );
        });
        
        return stories;
        
      case("users"):
        if (this.props.searchResults.users.length === 0) {
          return <div className="search-no-result">No result matched your search</div>;
        }
        
        const users = this.props.searchResults.users.map((user, i) => {
          return (
            <SearchIndexUserItem
              key={`search-user-item-${i}`} 
              user={user} />
          );
        });
        
        return users;
        
      case("tags"):
        if (this.props.searchResults.tags.length === 0) {
          return <div className="search-no-result">No result matched your search</div>;
        }
        
        const tags = this.props.searchResults.tags.map((tag, i) => {
          return (
            <Tag key={`search-tag-item-${i}`} desc={tag.tag_desc} />
          );
        });
        
        return tags;
    };
  }
  
  componentWillMount() {
    const qString = location.hash.replace("#/search?q=", "");

    if (qString.length > 0 && !qString.split("&").includes("redirect=true")) {
      this.props.searchAll(location.hash.replace("#/search?q=", ""));
    }
  }
  
  render() {
    if (!this.props.searchResults) {
      return <div className="loader" />;
    };
    
    const storiesActive = this.state.activeTab === "stories" ? "search-index-tab-active" : "";
    const usersActive = this.state.activeTab === "users" ? "search-index-tab-active" : "";
    const tagsActive = this.state.activeTab === "tags" ? "search-index-tab-active" : "";
    
    return (
      <div className="search-index">
        <div className="search-index-inner">
          <form onSubmit={this.search} className="search-form">
            <input
              className="search-form-input"
              onChange={this.handleOnChange}
              value={this.state.searchTerm} 
              placeholder="Search Fable" />
          </form>
          <div className="search-index-tabs group">
            <div
              className={`search-index-tab ${storiesActive}`} 
              onClick={this.toggleActiveTab.bind(this, "stories")}>
              Stories ({this.props.searchResults.stories.length})
            </div>
            <div
              className={`search-index-tab ${usersActive}`} 
              onClick={this.toggleActiveTab.bind(this, "users")}>
              Users ({this.props.searchResults.users.length})
            </div>
            <div
              className={`search-index-tab ${tagsActive}`} 
              onClick={this.toggleActiveTab.bind(this, "tags")}>
              Tags ({this.props.searchResults.tags.length})
            </div>
          </div>
          <ul className="search-index-items group">
            {this.renderActiveTab()}
          </ul>
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchAll }, dispatch);
};

function mapStateToProps(state) {
  return { searchResults: state.search.all };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchIndex);