import React, { Connect } from "react";
import Functions from "../../util/functions";

class SignOutLink extends Component {
  constructor() {
    super()
    
    this.signOut = this.signOut.bind(this);
  }
  
  signOut() {
    $.ajax({
      method: "DELETE",
       url: "/users/sign_out.json",
       data: {
         authenticity_token: Functions.getMetaContent("csrf-token")
       }
     }).done(function(){
       debugger
       location.reload();
     });
  }
  
  render() {
    return(
      <a href="#" onClick={this.signOut}>Sign Out</a>
    );
  }
};

export default SignOutLink;