import React, { Component } from "react";

class ContentFormParagraph extends Component {
  constructor() {
    super();
    
    this.state = { content: "" }
    this.handleOnInput = this.handleOnInput.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }
  
  handleOnInput(event) {
    this.setState({ content: event.target.innerText }, () => {
      // this.props.handleOnChange();
    });
  }
  
  handleOnKeyPress(event) {
    // if (event.charCode === 13) {
    //   this.props.addExtraParagraph();
    // } 
  }
  
  render() {
    // const paragraph = document.querySelector(`#content-form-paragraph-${this.props.pCount}`);
    
    return (
      <div
        id={`content-form-paragraph-${this.props.pCount}`} 
        contentEditable="true"
        onInput={this.handleOnInput}
        onKeyPress={this.handleOnKeyPress} 
        className="content-form-paragraph" 
        content={this.state.content} />
        
    );
  }
  
  componentDidMount() {
    const paragraph = document.querySelector(".content-form-paragraph");

    if (this.props.active && paragraph) {
      paragraph.focus();
    }
  }
};

export default ContentFormParagraph;