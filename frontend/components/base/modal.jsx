// COPY PASTE

import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/modal_toggle";
import AuthSelections from "../auth/auth_selections.jsx";

class Modal extends Component {
  constructor() {
    super();
    
    this.toggleModal = this.toggleModal.bind(this);
  }
  
  toggleModal() {
    this.props.toggleModal(null);
  }
  
  renderContent(content) {
    switch(content) {
      case "auth":
        return <AuthSelections />;
    }
  }
  
  render() {
    const content = this.props.modal.content;
    const modalDisplay = this.props.modal.active ? "" : "hidden";
    
    return (
      <div className={`modal modal-${content} ${modalDisplay}`}>
        <div onClick={this.toggleModal} className="modal-close-btn">x</div>
        <div className={`modal-inner modal-inner-${content}`}>
          {this.renderContent(content)}
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal }, dispatch);
};

function mapStateToProps(state) {
  return { modal: state.modal };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);