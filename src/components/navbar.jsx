import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            Algorithm Visualiser
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
