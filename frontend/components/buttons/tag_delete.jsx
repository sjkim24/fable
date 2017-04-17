import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteTagFollow, fetchTagFollows } from "../../actions/action_user";

class TagDelete extends Component {
  constructor() {
    super();
    
    this.deleteTagFollow = this.deleteTagFollow.bind(this);
  }
  
  deleteTagFollow(event) {
    const that = this;
    let data = {};
    data["token"] = this.props.token;
    data["id"] = this.props.id;

    this.props.deleteTagFollow(data)
    .then(() => {
      that.props.fetchTagFollows();
      that.props.searchTags();
    });
  }
  
  render() {
    if (!this.props.token || !this.props.currentUser) {
      return <div className="loader" />;
    }
    
    const classProps = this.props.className || "";
    
    return (
      <div className={`tag ${classProps}`} onClick={this.deleteTagFollow}>
        <div className={`tag-delete-button`}>x</div>
        {this.props.desc}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteTagFollow, fetchTagFollows }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser, token: state.auth.authToken };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagDelete);