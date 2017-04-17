import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchAll } from "../../actions/action_search";
import SearchIndexStoryItem from "./search_index_story_item.jsx";
import SearchIndexUserItem from "./search_index_user_item.jsx";
import SearchIndexTagItem from "./search_index_tag_item.jsx";

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
        const stories = this.props.searchResults.stories.map((story, i) => {
          return (
            <SearchIndexStoryItem
              key={`search-story-item-${i}`} 
              story={story} />
          );
        });
        
        return stories;
        
      case("users"):
        const users = this.props.searchResults.users.map((user, i) => {
          return (
            <SearchIndexUserItem
              key={`search-user-item-${i}`} 
              user={user} />
          );
        });
        
        return users;
        
      case("tags"):
        const tags = this.props.searchResults.tags.map((tag, i) => {
          return (
            <SearchIndexTagItem
              key={`search-tag-item-${i}`} 
              tag={tag} />
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
    
    console.log(this.props.searchResults);
    
    return (
      <div>
        <form onSubmit={this.search}>
          <input
            className="search-index-search"
            onChange={this.handleOnChange}
            value={this.state.searchTerm} 
            placeholder="Search Fable" />
        </form>
        <div className="search-index-tabs">
          <div onClick={this.toggleActiveTab.bind(this, "stories")}>
            Stories
          </div>
          <div onClick={this.toggleActiveTab.bind(this, "users")}>
            Users
          </div>
          <div onClick={this.toggleActiveTab.bind(this, "tags")}>
            Tags
          </div>
        </div>
        {this.renderActiveTab()}
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