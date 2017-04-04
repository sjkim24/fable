import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, updateUser } from "../../actions/action_user";
import ProfileTab from "./users_tab_profile.jsx";
import RecommendsTab from "./users_tab_recommends.jsx";
import ResponsesTab from "./users_tab_responses.jsx";
import { toggleModal } from "../../actions/action_modal";
import Follow from "../buttons/follow.jsx";

class UsersShow extends Component {
  constructor() {
    super();
    
    this.state = { 
      active: "profile",
      edit: false 
    }
    this.showFollowings = this.showFollowings.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  
  componentWillUpdate(nextProps, nextState) {
    const user = this.props.user.user;
    if (user && (user.id !== nextProps.user.user.id)) {
      window.scrollTo(0, 0);
    }
  }
  
  showFollowings() {
    this.props.toggleModal("followings");
  }
  
  showFollowers() {
    this.props.toggleModal("followers");
  }
  
  editProfile() {
    this.setState({ edit: true }, () => {
      document.querySelector(".user-show-user-fullname-edit").focus();
    });
  }
  
  handleSave() {
    // validate inputs
    // send ajax request to rails to make an 
    // update on user desc and fullname
    // let user = {};
    // user["id"] = this.props.user.user.id
    // user["fullname"] = this.state.fullname || this.props.user.user.fullname;
    // user["user_desc"] = this.state.user_desc || this.props.user.user.desc;
    let fileReader = new FileReader();
    const fileSelect = document.querySelector(".user-img-file-select");
    const files = fileSelect.files;
    let file = files[0];
    console.log(file);
    fileReader.readAsDataURL(file);
    console.log(file);
    const formData = new FormData();
    formData.append("user[id]", this.props.user.user.id);
    formData.append("user[fullname]", this.state.fullname || this.props.user.user.fullname);
    formData.append("user[user_desc]", this.state.user_desc || this.props.user.user.desc);
    formData.append("user[photo]", file)

    this.props.updateUser(this.props.user.user.id, formData);
    this.handleCancel();
  }
  
  handleCancel() {
    // i can easily reset my fullname, desc state to ""
    // but that will trigger start the enxt edit to with
    // input values of ""
    // figure out a way to solve this 
    this.setState({ edit: false });
  }
  
  handleOnChange(event, type) {
    switch(type) {
      case("fullname"):
        this.setState({ fullname: event.target.value });
        break;
      case("desc"):
        this.setState({ user_desc: event.target.value });
        break;
    }
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
            user={user.user}
            latest={user.latest} 
            recommends={user.recommends}
            toggleTab={this.toggleTab} />
        );
      case "recommends":
        return (
          <RecommendsTab 
            userFullname={user.user.fullname}
            recommends={user.recommends} />
        );
      case "responses":
        return <ResponsesTab
          userShowId={user.user.id}
          userFullname={user.user.fullname} 
          responses={user.comments} />;
    };
  }
  
  render() {
    const user = this.props.user.user;
    
    if (!user && !this.props.currentUser) {
      return <div className="loader" />;
    }

    const followings = this.props.user.followings;
    const followers = this.props.user.followers;
    
    const profileActive = this.state.active === "profile" ? "tab-header-active" : "";
    const recActive = this.state.active === "recommends" ? "tab-header-active" : "";
    const respActive = this.state.active === "responses" ? "tab-header-active" : "";
    
    const editDisplay = user.id === this.props.currentUser.id ? "" : "hidden"; 
    const inputDisplay = this.state.edit ? "" : "hidden";
    const divDisplay = this.state.edit ? "hidden" : "";
    
    const fullnameVal = this.state.fullname || user.fullname;
    const descVal = this.state.user_desc || user.desc;
    
    return (
      <div className="user-show">
        <header className="user-show-header">
          <div className="user-show-header-inner">
            <div className="user-show-header-img-container">
              <img src={user.image_url} alt="user img" className="user-show-header-img" />
              <div className={`stuffz ${inputDisplay}`}>
                <img src="/images/icons/camera.png" alt="camera img" className="camera" />
                <input type="file" name="user[photo]" className="user-img-file-select" />
              </div>
            </div>
            <div className={`user-show-user-fullname ${divDisplay}`}>{user.fullname}</div>
            <input 
              className={`user-show-user-fullname-edit user-show-user-fullname ${inputDisplay}`} 
              onChange={(event) => this.handleOnChange(event, "fullname")} 
              value={fullnameVal} 
              autoFocus />
            <div className={`user-show-user-desc ${divDisplay}`}>{user.desc}</div>
            <input 
              className={`user-show-user-desc-edit user-show-user-desc ${inputDisplay}`} 
              onChange={(event) => this.handleOnChange(event, "desc")} 
              value={descVal} 
              placeholder="Enter a description about yours"/>
            <div className="user-show-follow-info-container group">
              <div className="user-show-followings" onClick={this.showFollowings}>
                {followings.length}
              </div>
              <div className="user-show-followers" onClick={this.showFollowers}>
                {followers.length}
              </div>
            </div>
            <div 
              className={`user-show-edit-btn button ${editDisplay} ${divDisplay}`} 
              onClick={this.editProfile}>
              Edit
            </div>
            <div className="user-show-save-cancel-container group">
              <div 
                className={`user-show-save-btn button ${inputDisplay}`}
                onClick={this.handleSave}>
                Save
              </div>
              <div
                className={`user-show-cancel-btn button ${inputDisplay}`}
                onClick={this.handleCancel}>
                Cancel
              </div>
            </div>
            <Follow
              userId={user.id}
              following={user.following}
              name="usersShow"
              className="user-show-follow" />
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
  return bindActionCreators({ fetchUser, toggleModal, updateUser }, dispatch);
};

function mapStateToProps(state) {
  return {
    currentUser: state.auth.currentUser, 
    user: state.user,
    followings: state.user.followings,
    follower: state.user.followers
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersShow);