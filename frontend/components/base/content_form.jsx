import React, { Component } from "react";

class ContentForm extends Component {
  constructor() {
    super();
    
    this.handleOnInput = this.handleOnInput.bind(this);
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.content) {
      document.querySelector(".content-form").innerText = nextProps.content;
    }
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
  
  componentDidMount() {
    document.querySelector(".content-form").innerText = this.props.content;
  }
}

export default ContentForm;