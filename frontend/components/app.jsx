import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from './base/header.jsx';
import NavBar from './nav_bar/nav_bar.jsx';
import Modal from "./base/modal.jsx";
import { 
  fetchAuthToken, fetchCurrentUser, setAuthToken 
} from "../actions/action_auth";

class App extends Component {
  componentWillMount() {
    if (!this.props.auth.currentUser) {
      this.props.fetchCurrentUser();
    }
  }
  
  render() {
    return (
      <div className="app">
        <div id="filler"></div>
        <Header />
        <NavBar />
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