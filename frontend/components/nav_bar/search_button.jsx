import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchAll } from "../../actions/action_search";

class SearchButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  
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
    if (this.state.term.length > 0 && event.key === "Enter") {
      this.props.searchAll(this.state.term)
      .then((response) => {
        this.props.toggleSearchBar();
        this.context.router.push(`/search?q=${this.state.term}&redirect=true`);
      });
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchAll }, dispatch);
};

export default connect(null, mapDispatchToProps)(SearchButton);