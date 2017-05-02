import React, { Component } from "react";

class ContentForm extends Component {
  constructor() {
    super();
    
    this.handleOnInput = this.handleOnInput.bind(this);
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (!this.props.content && nextProps.content) {
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
  
  // i prob don't even need this
  // componentDidMount() {
  //   document.querySelector(".content-form").innerText = this.props.content;
  // }
}

export default ContentForm;