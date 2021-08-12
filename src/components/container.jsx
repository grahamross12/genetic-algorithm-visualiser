import React, { Component } from "react";
import NavBar from "./navbar";
import Grid from "./grid";
import Sidebar from "./sidebar";
import "./container.css";

class Container extends Component {
  state = { start: false };
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <div className="row">
            <div className="col"></div>
            <div className="col-3">
              <Sidebar onStart={this.handleStart} />
            </div>
            <div className="col">
              <Grid start={this.state.start} />
            </div>
            <div className="col"></div>
          </div>
        </main>
      </React.Fragment>
    );
  }

  handleStart = () => {
    console.log("handle start called");
    this.setState({ start: true });
  };
}

export default Container;
