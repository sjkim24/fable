import React, { Component } from "react";

class ContentForm extends Component {
  constructor() {
    super();
    
    this.state = { content: "" }  
    this.handleOnInput = this.handleOnInput.bind(this);
  }
  
  handleOnInput(event) {
    this.props.handleOnInput(event.target.innerText);
  }
  
  render() {
    return (
      <div 
        className="content-form"
        contentEditable="true"
        onInput={this.handleOnInput}>
      </div>
    );
  }
}

export default ContentForm;