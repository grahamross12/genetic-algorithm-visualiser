import React, { Component } from "react";
import "./sidebar.css";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div id="sidebarBox">
        <button className="btn btn-primary" onClick={this.props.onStart}>
          Start
        </button>
        <button className="btn btn-primary" onClick={this.nextGeneration}>
          >
        </button>
        <button className="btn btn-primary" onClick={this.clearGrid}>
          Clear
        </button>
      </div>
    );
  }
}

export default Sidebar;
