import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from './base/header.jsx';
import NavBar from './nav_bar/nav_bar.jsx';
import Modal from "./base/modal.jsx";
import { fetchCurrentUser } from "../actions/action_auth";

class App extends Component {
  componentWillMount() {
    this.props.fetchCurrentUser();
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
};

// export default App;

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCurrentUser }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);