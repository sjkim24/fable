import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { fetchRecs } from "../../actions/recs_fetch";
// import RecsIndexItem from "./index_item.jsx";

class RecsIndex extends Component {
  componentWillMount() {
    // fetch recs
  }
  
  renderRecs() {
    // const recs = this.props.recs.map((rec, i) => {
    //   return <RecsIndexItem key={`rec-${i}`} story={rec} />
    // });
    
    // return recs;
  }
  
  render() {
    return (
      <ul className="recs">
        <li className="rec">
          <div className="rec-category">Top Stories</div>
          <ul className="rec-items-container">
            <li className="rec-item">1</li>
            <li className="rec-item">2</li>
            <li className="rec-item">3</li>
          </ul>
        </li>
        <li className="rec">
          <div className="rec-category">Top Sports</div>
          <ul className="rec-items-container">
            <li className="rec-item">1</li>
            <li className="rec-item">2</li>
            <li className="rec-item">3</li>
          </ul>
        </li>
        <li className="rec">
          <div className="rec-category">Top Technology</div>
          <ul className="rec-items-container">
            <li className="rec-item">1</li>
            <li className="rec-item">2</li>
            <li className="rec-item">3</li>
          </ul>
        </li>
        <li className="rec-tags">
          <div className="rec-category">Tags you follow</div>
          <ul className="rec-tags-container group">
            <li className="rec-tag tag">Sports</li>
            <li className="rec-tag tag">Business</li>
            <li className="rec-tag tag">Science</li>
            <li className="rec-tag tag">Technology</li>
            <li className="rec-tag tag">Fashion</li>
          </ul>
        </li>
      </ul>
    );
  }
};
// {this.renderRecs()} use this instead of lists later

export default RecsIndex;