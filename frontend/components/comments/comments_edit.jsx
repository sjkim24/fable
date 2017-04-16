import React, { Component } from "react";

class CommentsEdit extends Component {
  constructor() {
    super();
    
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    console.log("submit clicked");
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          comments edit form
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
};

export default CommentsEdit;