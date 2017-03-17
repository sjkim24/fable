import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/modal_toggle";
import { refillModal } from "../../actions/modal_refill";
import AuthSelections from "../auth/auth_selections.jsx";
class Modal extends Component {
  constructor() {
    super();
    
    this.toggleModal = this.toggleModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  
  toggleModal() {
    this.props.toggleModal(null);
  }
  
  handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      this.props.toggleModal(null);
    }
  }
  
  renderContent(content) {
    switch(content) {
      case "auth-selections":
        console.log(this.props.refillModal);
        return <AuthSelections refillModal={this.props.refillModal} />;
      case "auth-signin":
        return "sign in form!!!";
    }
  }
  
  render() {
    const content = this.props.modal.content;
    const modalDisplay = this.props.modal.active ? "" : "hidden";
    
    return (
      <div onClick={this.handleOutsideClick} className={`modal modal-${content} ${modalDisplay}`}>
        <div onClick={this.toggleModal} className="modal-close-btn">x</div>
        <div className={`modal-inner modal-inner-${content}`}>
          {this.renderContent(content)}
        </div>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleModal, refillModal }, dispatch);
};

function mapStateToProps(state) {
  return { modal: state.modal };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);