import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/action_user";
import { Link } from "react-router";

class UsersTabRecItem extends Component {
  constructor() {
    super();
    
    this.fetchUser = this.fetchUser.bind(this);
  }
  
  fetchUser() {
    this.props.fetchUser(this.props.rec.author_username);
  }
  
  renderRecImage(rec) {
    if (rec.image_url) {
      return (
        <img 
          src={rec.image_url} 
          alt="story img" 
          className="rec-img" />
      );
    }
  }
  
  render() {
    const rec = this.props.rec;
    const imgClass = rec.image_url ? "" : "rec-title-no-img";
    
    return (
      <li className="user-profile-rec-item padding-side">
        <div className="rec-left-container">
          <Link to={`/stories/${rec.story_id}`}>
            <div className={`rec-title ${imgClass}`}>{rec.story_title}</div>
          </Link>
          <Link 
            to={`/users/@${rec.author_username}`} 
            onClick={this.fetchUser}>
            <div className="rec-author">{rec.author_fullname}</div>
          </Link>
        </div>
        {this.renderRecImage(rec)}
      </li>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(null, mapDispatchToProps)(UsersTabRecItem);