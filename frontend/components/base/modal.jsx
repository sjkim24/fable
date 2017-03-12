// modal component takes these props: 
// name

import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className={`modal modal-${this.props.name}`}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;