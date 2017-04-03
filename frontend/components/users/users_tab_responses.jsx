import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchResponses } from "../../actions/action_user";
import UserTabRespItem from "./users_tab_resp_item.jsx";

class ResponsesTab extends Component {
  renderResponses(responses) {
    const resps = responses.map((resp, i) => {
      return <UserTabRespItem 
        userShowId={this.props.userShowId}
        response={resp} 
        key={`resp-${i}`} />
    });
    
    return resps;
  }
  
  render() {
    const headerDisplay = this.props.responses.length > 0 ? "" : "hidden";

    return (
      <div className="user-responses">
        <header className={`user-show-tab-header ${headerDisplay}`}>
          Responses by {this.props.userFullname}
        </header>
        <ul className="user-responses-ul">
          {this.renderResponses(this.props.responses)}
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchResponses }, dispatch);
};

function mapStateToProps(state) {
  return { responses: state.user.responses };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsesTab);