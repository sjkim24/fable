import React, { Component } from "react";

class ContentForm extends Component {
  constructor() {
    super();
    
    this.handleOnInput = this.handleOnInput.bind(this);
  }
  
  handleOnInput(event) {
    this.props.handleContentFormChange(event.target.innerText);
  }
  
  render() {
    return (
      <div 
        className="content-form"
        contentEditable="true"
        placeholder="Content"
        onInput={this.handleOnInput}>
      </div>
    );
  }
}

export default ContentForm;