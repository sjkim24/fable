import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTagFollows } from "../../actions/action_user";

class UsersTagFollowsForm extends Component {
  constructor() {
    super();
    
    this.state = { 
      searchTerm: "",
      searchedTags: [],
      userTags: [] 
    };
    
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
  handleOnChange(event) {
    // fire ajax here to search for any tags with tag_desc of current search term
    // store searchedTags in this.state.searchedTags
    this.setState({ searchTerm: event.target.value });
  }
  
  handleOnSubmit(event) {
    event.preventDefault();
    console.log("submit clicked!");
  }
  
  componentWillMount() {
    this.props.fetchTagFollows(this.props.currentUser.id);
  }
  
  render() {
    console.log(this.props.tagFollows);
    
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          tag form
          <input 
            onChange={this.handleOnChange}
            value={}/>
        </form>
        <div>
          display searchedTags here
          {this.state.searchedTags}
        </div>
        <div>
          display the user's tag follows here
          {this.state.userTags}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTagFollows }, dispatch);
};

function mapStateToProps(state) {
  return { currentUser: state.auth.currentUser, tagFollows: state.user.tagFollows };
};

export default connect(mapStateToProps, mapDispatchToProps)()