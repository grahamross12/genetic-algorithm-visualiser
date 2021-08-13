import React, { Component } from "react";
import "./sidebar.css";

// Default values for the sliders
const INTERVAL_TIME = 100;
const POP_SIZE = 100;
const CHILDREN_SIZE = 50;
const WINNERS_SIZE = 5;
const MUTATION_RATE = 0.1;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.intervalTime = INTERVAL_TIME;
    this.popSize = POP_SIZE;
    this.childrenSize = CHILDREN_SIZE;
    this.winnersSize = WINNERS_SIZE;
    this.mutationRate = MUTATION_RATE;
    this.state = {};
  }
  componentDidMount() {
    this.props.onUpdateInterval(this.intervalTime);
    this.props.onUpdatePop(this.popSize);
    this.props.onUpdateChildren(this.childrenSize);
    this.props.onUpdateWinners(this.winnersSize);
  }

  render() {
    return (
      <div id="sidebarBox">
        <div className="buttons">
          {this.props.running ? (
            <button className="btn btn-primary" onClick={this.clickPause}>
              <i className="fa fa-pause"></i>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={this.clickStart}>
              <i className="fa fa-play"></i>
            </button>
          )}
          <button className="btn btn-primary" onClick={this.clickClearGrid}>
            Reset
          </button>
        </div>
        <div className="propContainer">
          <p>Interval time = {this.intervalTime}ms</p>
          <div className="slidecontainer">
            <input
              id="intervalTime"
              type="range"
              min="1"
              max="1000"
              onChange={this.handleChangeInterval}
              value={this.intervalTime}
              className="slider"
            />
          </div>
        </div>
        <div className="propContainer">
          <p>Population size: {this.popSize}</p>
          <div className="slidecontainer">
            <input
              id="popSize"
              type="range"
              min="1"
              max="500"
              onChange={this.handleChangePop}
              value={this.popSize}
              className="slider"
            />
          </div>
        </div>
        <div className="propContainer">
          <p>Number of children: {this.childrenSize}</p>
          <div className="slidecontainer">
            <input
              id="childrenSize"
              type="range"
              min="0"
              max={this.popSize}
              onChange={this.handleChangeChildren}
              value={this.childrenSize}
              className="slider"
            />
          </div>
        </div>
        <div className="propContainer">
          <p>Number of winners: {this.winnersSize}</p>
          <div className="slidecontainer">
            <input
              id="winnersSize"
              type="range"
              min="0"
              max={this.popSize - this.childrenSize}
              onChange={this.handleChangeWinners}
              value={this.winnersSize}
              className="slider"
            />
          </div>
        </div>
        <div className="propContainer">
          <p>Mutation rate: {this.mutationRate}</p>
          <div className="slidecontainer">
            <input
              id="mutationRate"
              type="range"
              min="0"
              max="100"
              onChange={this.handleChangeMutationRate}
              value={this.mutationRate * 100}
              className="slider"
            />
          </div>
        </div>
        <div className="showInfo">
          <p>Iteration: {this.props.iteration}</p>
          <p>Distance: {Math.round(this.props.distance)}</p>
        </div>
      </div>
    );
  }

  clickClearGrid = () => {
    this.setState({ running: false });
    this.childrenSize = CHILDREN_SIZE;
    this.popSize = POP_SIZE;
    this.winnersSize = WINNERS_SIZE;
    this.intervalTime = INTERVAL_TIME;
    this.props.onClearGrid();
  };

  clickPause = () => {
    this.setState({ running: false });
    this.props.onPause();
  };

  clickStart = () => {
    this.setState({ running: true });
    this.props.onStart();
  };

  handleChangeMutationRate = (event) => {
    this.mutationRate = event.target.value / 100;
    this.props.onUpdateMutationRate(this.mutationRate);
  };

  handleChangeWinners = (event) => {
    this.winnersSize = event.target.value;
    this.props.onUpdateWinners(this.winnersSize);
  };

  handleChangeChildren = (event) => {
    this.childrenSize = event.target.value;
    // if (this.winnersSize > this.popSize - this.childrenSize) {
    //   this.winnersSize = this.popSize - this.childrenSize;
    // }
    this.props.onUpdateChildren(this.childrenSize);
  };

  handleChangePop = (event) => {
    this.popSize = event.target.value;
    // if (this.childrenSize + this.winnersSize > this.popSize) {
    //   console.log(this.childrenSize + this.winnersSize);
    //   if (this.popSize - this.childrenSize > 0) {
    //     this.winnersSize = this.popSize - this.childrenSize;
    //   }
    // }
    // if (this.winnersSize <= 0 && this.popSize <= this.childrenSize) {
    //   this.childrenSize = this.popSize;
    // }
    this.props.onUpdatePop(this.popSize);
  };

  handleChangeInterval = (event) => {
    this.intervalTime = event.target.value;
    this.props.onUpdateInterval(this.intervalTime);
  };
}

export default Sidebar;
