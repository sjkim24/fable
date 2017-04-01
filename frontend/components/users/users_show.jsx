import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../actions/action_user";
import ProfileTab from "./users_tab_profile.jsx";
import RecommendsTab from "./users_tab_recommends.jsx";
import ResponsesTab from "./users_tab_responses.jsx";

class UsersShow extends Component {
  constructor() {
    super();
    
    this.state = { active: "profile" }
    this.showFollowings = this.showFollowings.bind(this);
    this.showFollower = this.showFollowers.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (this.props.user && this.props.user.id !== nextProps.user.id) {
      window.scrollTo(0, 0);
    }
  }
  
  showFollowings() {
    console.log("show followings clicked");
  }
  
  showFollowers() {
    console.log("show followers clicked");
  }
  
  editProfile() {
    console.log("edit profile clicked");
  }
  
  toggleTab(type) {
    this.setState({ active: type });
  };
  
  componentWillMount() {
    this.props.fetchUser(this.props.params.username);
  }
  
  renderActiveTab() {
    const user = this.props.user;
    
    switch(this.state.active) {
      case "profile":
        return (
          <ProfileTab 
            userFullname={user.fullname}
            latest={user.latest} 
            recommends={user.recommends}
            toggleTab={this.toggleTab} />
        );
      case "recommends":
        return (
          <RecommendsTab 
            userFullname={user.fullname}
            recommends={user.recommends} />
        );
      case "responses":
        return <ResponsesTab responses={user.comments} />;
    };
  }
  
  render() {
    const user = this.props.user;
    
    if (!user) {
      return <div className="loader" />;
    }
    
    const profileActive = this.state.active === "profile" ? "tab-header-active" : "";
    const recActive = this.state.active === "recommends" ? "tab-header-active" : "";
    const respActive = this.state.active === "responses" ? "tab-header-active" : "";
    
    return (
      <div className="user-show">
        <header className="user-show-header">
          <div className="user-show-header-inner">
            <img src={user.image_url} alt="user img" className="user-show-header-img" />
            <div className="user-show-user-fullname">{user.fullname}</div>
            <div className="user-show-user-desc">{user.desc}</div>
            <div className="user-show-follow-info-container group">
              <div className="user-show-followings" onClick={this.showFollowings}>
                {user.followings.length}
              </div>
              <div className="user-show-followers" onClick={this.showFollowers}>
                {user.followers.length}
              </div>
            </div>
            <div className="user-show-edit-btn button" onClick={this.editProfile}>Edit</div>
          </div>
        </header>
        <nav className="user-show-navbar">
          <div className="user-show-inner-navbar">
            <ul className="user-show-navbar-ul padding-side">
              <li 
                className={`user-show-navbar-link ${profileActive}`}
                onClick={this.toggleTab.bind(this, "profile")}>
                Profile
              </li>
              <li 
                className={`user-show-navbar-link ${recActive}`} 
                onClick={this.toggleTab.bind(this, "recommends")}>
                Recommends
              </li>
              <li 
                className={`user-show-navbar-link ${respActive}`} 
                onClick={this.toggleTab.bind(this, "responses")}>
                Responses
              </li>
            </ul>
          </div>
        </nav>
        <div className="user-show-active-tab-container">
          {this.renderActiveTab()}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
};

function mapStateToProps(state) {
  return { user: state.user.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersShow);