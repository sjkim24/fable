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
      edit: false,
      imgLoading: false 
    }
    this.showFollowings = this.showFollowings.bind(this);
    this.showFollowers = this.showFollowers.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFilePreview = this.handleFilePreview.bind(this);
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
  
  handleFilePreview(event) {
    event.persist();
    this.setState({ imgLoading: true, imgPrevLoaded: false }, () => {
      const file = event.target.files[0];
      let fileReader = new FileReader();

      fileReader.readAsDataURL(file);   
      fileReader.onloadend = () => {
        this.setState({ imgLoading: false, imgPrevLoaded: true, imgPrevUrl: fileReader.result, file: file });
      };
    });
  }
  
  handleSave() {
    // validate inputs
    if (!this.state.imgLoading) {
      const formData = new FormData();
      
      formData.append("user[id]", this.props.user.user.id);
      formData.append("user[fullname]", this.state.fullname || this.props.user.user.fullname);
      formData.append("user[user_desc]", this.state.user_desc || this.props.user.user.desc);
      if (this.state.file) {
        formData.append("user[photo]", this.state.file);
      }
      
      this.props.updateUser(this.props.user.user.id, formData);
      this.handleCancel();
    }
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
  
  componentWillMount() {
    this.props.fetchUser(this.props.params.username);
  }
  
  render() {
    const user = this.props.user.user;
    
    if (!user) {
      return <div className="loader" />;
    }

    const followings = this.props.user.followings;
    const followers = this.props.user.followers;
    
    const profileActive = this.state.active === "profile" ? "tab-header-active" : "";
    const recActive = this.state.active === "recommends" ? "tab-header-active" : "";
    const respActive = this.state.active === "responses" ? "tab-header-active" : "";
    
    let editDisplay;
    if (this.props.currentUser) {
      editDisplay = user.id === this.props.currentUser.id ? "" : "hidden";
    } else {
      editDisplay = "hidden";
    }
    
    const overlayDisplay = this.state.edit ? "opaque-overlay" : ""; 
    const inputDisplay = this.state.edit ? "" : "hidden";
    const divDisplay = this.state.edit ? "hidden" : "";
    
    const fullnameVal = this.state.fullname || user.fullname;
    const descVal = this.state.user_desc || user.desc;
    
    const imgLoading = this.state.imgLoading ? "disabled-button" : "";
    const prevDisplay = this.state.imgPrevLoaded ? "" : "hidden";

    return (
      <div className="user-show">
        <header className="user-show-header">
          <div className="user-show-header-inner">
            <div className={`user-show-header-img-container ${overlayDisplay}`}>
              <img src={user.image_url} alt="user img" className="user-show-header-img" />
              <img src={this.state.imgPrevUrl} className={`user-show-prev-img ${prevDisplay}`} />
              <div className={`user-show-file-input-container ${inputDisplay}`}>
                <label htmlFor="file-input">
                  <img src="/images/icons/camera.png" alt="camera img" className="img-prev-camera-img" />
                  <input
                    id="file-input"
                    onChange={this.handleFilePreview} 
                    type="file" 
                    name="user[photo]" 
                    className="user-img-file-input" />
                </label>
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
                className={`user-show-save-btn button ${inputDisplay} ${imgLoading}`}
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
              username={this.props.params.username.replace("@", "")}
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