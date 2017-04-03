import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchStory } from "../../actions/action_stories";
import { fetchComment } from "../../actions/action_comments";
import { toggleModal } from "../../actions/action_modal";
import { fetchFollowers, fetchFollowings } from "../../actions/action_user";

class Follow extends Component {
  constructor() {
    super();
    
    this.state = { token: "" };
    this.checkAuthThenToggle = this.checkAuthThenToggle.bind(this);
  }
  
  checkAuthThenToggle() {
    if (this.props.currentUser) {
      this.setState({ token: $('meta[name=csrf-token]').attr('content') }, () => {
        this.toggleFollow()
      });
    } else {
      this.props.toggleModal("auth-selections");
    }
  }
  
  toggleFollow() {
    const that = this;
    const name = this.props.name;
    let url;
    let method;    
    
    if (this.props.following) {
      url = "/api/follows/destroy";
      method = "delete";
    } else {
      url = `/api/users/${this.props.userId}/follows`;
      method = "post";
    }
    
    axios({
      method: method,
      url: url,
      data: {
        user: { user_id: this.props.userId },
        authenticity_token: this.state.token
      }
    })
    .then((response) => {
      switch(name) {
        case("storiesShow"):
          that.props.fetchStory(that.props.storyId);
          break;
        case("commentsShow"):
          that.props.fetchComment(that.props.commentId);
          break;
        case("followingsModal"):
          that.props.fetchFollowings(that.props.userShowId);
          break;
        case("followersModal"):
          that.props.fetchFollowers(that.props.userShowId);
          break;
        case ("usersShow"):
          // fetch user here
          console.log("usersshow hit, i need to update user once again here");
          break;
      };
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  render() {
    const classProps = this.props.className || "";
    const follow = this.props.following ? "Unfollow" : "Follow";
    const followDisplay = this.props.userId !== this.props.currentUser.id ? "" : "hidden";
    
    return (
      <div
        className={`follow-btn ${this.props.className}-btn button followDisplay`} 
        onClick={this.checkAuthThenToggle}>
        {follow}
      </div>
    );
  }
  
  componentDidMount() {
    this.setState({ token: $('meta[name=csrf-token]').attr('content') });
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchStory, fetchComment, toggleModal,fetchFollowers, fetchFollowings 
  }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(Follow);