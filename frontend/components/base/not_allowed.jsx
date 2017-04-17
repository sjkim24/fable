import React, { Component } from "react";

class NotAllowed extends Component {
  render() {
    return (
      <div id="not-allowed">
        <div className="not-allowed-header">
          You're not allowed here!
        </div>
        <a href="http://www.sjkim.io/PokeSnake/">
          <img src="/images/pokeball.jpg" alt="pokeball image" className="not-allowed-pokeball blink" />
        </a>
        <div className="not-allowed-footer">
          How about a little game instead?
          <br></br>
          Click the PokeBall...
        </div>
      </div>
    );
  }
};

export default NotAllowed;