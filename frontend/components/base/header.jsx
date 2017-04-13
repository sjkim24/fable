import React, { Component, PropTypes } from "react";
import SearchButton from "../nav_bar/search_button.jsx";
import Modal from "./modal.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/action_modal";
import { Link } from "react-router";
import { setCurrentUser } from "../../actions/action_auth";
import DropDownMenu from "./drop_down_menu.jsx";

class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  
  constructor() {
    super();
    
    this.state = { 
      dropDownMenuActive: false,
      rejectList: { 
        "header-list-user-container": true, 
        "dropdown-menu": true
      },
      searchBarActive: false
    };
    this.toggleAuthModal = this.toggleAuthModal.bind(this);
    this.toggleDropDownMenu = this.toggleDropDownMenu.bind(this);
    this.checkRejectThenToggle = this.checkRejectThenToggle.bind(this);
    this.checkAuthThenRender = this.checkAuthThenRender.bind(this);
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
  }
  
  toggleAuthModal() {
    this.props.toggleModal("auth-selections");
  }
  
  checkRejectThenToggle(event) {
    const klass = event.target.parentNode.classList[0];
    
    if (this.state.dropDownMenuActive && !this.state.rejectList[klass]) {
      this.setState({ dropDownMenuActive: false });
    }
  }
  
  toggleDropDownMenu() {
    this.setState({ dropDownMenuActive: !this.state.dropDownMenuActive });
  }
  
  checkAuthThenRender() {
    if (this.props.currentUser) {
      this.context.router.push("/new_story");
    } else {
      this.toggleAuthModal();
    }
  }
  
  renderAuthOrUser() {
    if (this.props.currentUser) {
      return (
        <div 
          className="header-list-user-container"
          onClick={this.toggleDropDownMenu}>
          <img 
            src={this.props.currentUser.user_image_url} 
            alt="user image" 
            className="header-list-user-img" />
          <DropDownMenu
            username={this.props.currentUser.username}
            name="user"
            active={this.state.dropDownMenuActive} 
            links={["Profile", "My Stories", "Tag Follows", "Sign Out"]} />
        </div>
      );
    } else {
      return (
        <div onClick={this.toggleAuthModal} className="header-list-auth-link">
          Signin / Signup
        </div>
      );
    }
  }
  
  toggleSearchBar() {
    this.setState({ searchBarActive: !this.state.searchBarActive }, () => {
      if (this.state.searchBarActive) {
        document.querySelector(".search-bar").focus();
      }
    });
  }
  
  render() {
    const authLinkDisplay = "";
    const storyLinkDisplay = "hidden"
      
    return(
      <header className="header padding-side group">
        <div className="header-inner group">
          <Link to="/" className="header-list-left header-list-logo">
            <img src="/images/logo_small.png" alt="fable logo" className="header-list-logo-img-small" />
            <img src="/images/logo_wide.png" alt="fable logo" className="header-list-logo-img-wide" />
          </Link>
          <ul className="header-list-right">
            <li className="header-list-story-link">
              <div onClick={this.checkAuthThenRender} className="header-list-story-link-btn">
                Write a story
              </div>
            </li>
            <li className="header-list-auth-user-container">
              {this.renderAuthOrUser()}
            </li>
            <li className="header-list-search">
              <SearchButton
                active={this.state.searchBarActive} 
                toggleSearchBar={this.toggleSearchBar} />
            </li>
          </ul>
        </div>
      </header>
    );
  }
  
  componentDidMount() {    
    document.body.addEventListener("click", this.checkRejectThenToggle);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal, setCurrentUser }, dispatch);
}

function mapStateToProps(state) {
  return { modal: state.modal, currentUser: state.auth.currentUser }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);