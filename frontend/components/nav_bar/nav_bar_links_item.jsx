import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
import { fetchStoriesByTag } from "../../actions/action_stories";

class NavBarLinksItem extends Component {
  constructor() {
    super();
    
    this.fetchStoriesByTag = this.fetchStoriesByTag.bind(this);
  }
  
  fetchStoriesByTag(event) {
    // event.preventDefault();
    this.props.fetchStoriesByTag(this.props.text.toLowerCase());
  }
  
  render() {
    const text = this.props.text.split("-").map((word) => {
      return word[0].toUpperCase() + word.slice(1);
    }).join(" ");
    
    let link;
    if (this.props.text === "home") {
      link = <Link to="/">Home</Link>;
    } else {
      link = (
        <Link 
          to={`/?tag=${this.props.text}`} 
          onClick={this.fetchStoriesByTag}>
          {text}
        </Link>
      );
    }
    
    return (
      <li className={`nav-bar-link nav-bar-link-${this.props.text}`}>
        {link}
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchStoriesByTag }, dispatch);
};

export default connect(null, mapDispatchToProps)(NavBarLinksItem);