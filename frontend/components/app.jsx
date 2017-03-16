// copy paste
import React, { Component } from 'react';
import Header from './base/header.jsx';
import NavBar from './nav_bar/nav_bar.jsx'
import Modal from "./base/modal.jsx";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <NavBar />
        <Modal />
        {this.props.children}
      </div>
    );
  }
}