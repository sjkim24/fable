import React, { Component } from "react";

class SearchButton extends Component {
  constructor() {
    super();
    
    this.state = { term: "" };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }
  
  handleOnChange(event) {
    this.setState({ term: event.target.value });
  }
  
  handleOnKeyDown(event) {
    if (event.key === "Enter") {
      // make an ajax call to search
      // take them to search results page
      console.log("make a search!");
    }
  }
  
  render() {
    const displaySearchBar = this.props.active ? "active" : "hidden";

    return (
      <div className="search-btn group">
        <img 
          src="/images/icons/search.png" 
          alt="search" 
          className="search-btn-img" 
          onClick={this.props.toggleSearchBar} />
        <input
          placeholder="Search Fable" 
          className={`search-bar search-bar-${displaySearchBar}`}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown} 
          value={this.state.term} />
      </div>
    );
  }
}

export default SearchButton;