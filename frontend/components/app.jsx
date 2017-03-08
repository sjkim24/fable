import React, { Component } from 'react';
import Header from './base/header.jsx';
import NavBar from './nav_bar/nav_bar.jsx'

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}