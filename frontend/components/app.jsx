import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from './base/header.jsx';
import Modal from "./base/modal.jsx";
import NavBar from './nav_bar/nav_bar.jsx';
import SlidingMenu from "./base/sliding_menu.jsx";
import { 
  fetchAuthToken, fetchCurrentUser, setAuthToken 
} from "../actions/action_auth";

class App extends Component {
  constructor() {
    super();
    
    this.state = { slidingMenuActive: false };
    this.toggleSlidingMenu = this.toggleSlidingMenu.bind(this);
  }
  
  toggleSlidingMenu() {
    this.setState({ active: !this.state.slidingMenuActive });
  }
  
  componentWillMount() {
    if (!this.props.auth.currentUser) {
      this.props.fetchCurrentUser();
    }
  }
  
  render() {
    return (
      <div className="app">
        <Header />
        <NavBar toggleSlidingMenu={this.toggleSlidingMenu} />
        <SlidingMenu active={this.state.slidingMenuActive} />
        <Modal />
        {this.props.children}
      </div>
    );
  }
  
  componentDidMount() {
    const token = $('meta[name=csrf-token]').attr('content');

    this.props.setAuthToken(token);
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchAuthToken, fetchCurrentUser, setAuthToken 
  }, dispatch);
};

function mapStateToProps(state) {
  return { auth: state.auth };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);