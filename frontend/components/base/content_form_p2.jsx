import React, { Component } from "react";

class ContentFormParagraph2 extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <p>
        {this.state.content}
      </p>
    );
  }
};

export default ContentFormParagraph2;