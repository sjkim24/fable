import React, { Component } from "react";
import ContentFormParagraph from "./content_form_paragraph.jsx";

class ContentForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      paragraphs: [ "hello" ]    
    }
  }
  
  render() {
    return (
      <div className="comment-content-form">
        {this.state.paragraphs}
      </div>
    );
  }
}


// class ContentForm extends Component {
//   constructor() {
//     super();
//     
//     this.state = { 
//       pCount: 1,
//       extraParagraphs: []
//     };
//     
//     this.addExtraParagraph = this.addExtraParagraph.bind(this);
//     this.handleOnChange = this.handleOnChange.bind(this);
//   }
//   
//   addExtraParagraph() {
//     const paragraph = <ContentFormParagraph
//       key={this.state.pCount + 1}
//       pCount={this.state.pCount + 1} 
//       addExtraParagraph={this.addExtraParagraph} />;
//     
//     const paragraphs = this.state.extraParagraphs.slice();
//     paragraphs.push(paragraph);
// 
//     this.setState({
//       pCount: this.state.pCount + 1,
//       extraParagraphs: paragraphs
//     });
//   }
//   
//   handleOnChange() {
//     debugger
//     // console.log(event);
//   }
//   
//   render() {
//     // whatever i nest in the parent div,
//     // i should add more to comment form rejectList state
//     const active = this.state.pCount === 1 ? true : false;
//     
//     console.log(active);
//     console.log("ep", this.state.pCount, this.state.extraParagraphs);
//     
//     return (
//       <div 
//         className="comment-content-form"
//         onChange={this.handleOnChange}>
//         <ContentFormParagraph
//           key={this.state.pCount}
//           pCount={this.state.pCount} 
//           active={active}
//           addExtraParagraph={this.addExtraParagraph} 
//           handleOnChange={this.handleOnChange} />
//         {this.state.extraParagraphs}
//       </div>
//     );
//   }
// };
// 
export default ContentForm;