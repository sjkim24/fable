import React, { Component } from "react";
import UserTabRespItem from "./users_tab_resp_item.jsx";

class ResponsesTab extends Component {
  renderResponses(responses) {
    const resps = responses.map((resp, i) => {
      return <UserTabRespItem response={resp} key={`resp-${i}`} />
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

export default ResponsesTab;