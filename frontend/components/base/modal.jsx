// modal component takes these props: 
// name

// COPY PASTE
import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleModal } from "../../actions/modal_toggle";
import AuthSelections from "../auth/auth_selections.jsx";

class Modal extends Component {
  renderContent(content) {
    switch(content) {
      case "auth":
        return <AuthSelections />;
    }
  }
  
  render() {
    const modalDisplay = this.props.modal.active ? "" : "hidden";
    
    return (
      <div className={`modal modal-${this.props.name} ${modalDisplay}`}>
        {this.renderContent(this.props.modal.content)}
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

// export default Modal;