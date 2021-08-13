import React, { Component } from "react";
import Grid from "./grid";
import Sidebar from "./sidebar";
import GeneticAlgorithm from "../genetic-algorithm.js";
import "./container.css";

class Container extends Component {
  constructor() {
    super();
    this.GRID_WIDTH = 26;
    this.GRID_HEIGHT = 24;
    this.activeCells = new Set();
    this.points = [];
    this.state = {
      active: new Set(),
      solution: null,
      iteration: 0,
      distance: 0,
      running: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <div className="wrapper">
            <div className="row flex-nowrap">
              <div className="col-3 sidebarDiv">
                <Sidebar
                  onStart={this.handleStart}
                  onPause={this.handlePause}
                  onClearGrid={this.handleClearGrid}
                  onUpdateInterval={this.handleUpdateInterval}
                  onUpdatePop={this.handleUpdatePop}
                  onUpdateChildren={this.handleUpdateChildren}
                  onUpdateWinners={this.handleUpdateWinners}
                  onUpdateMutationRate={this.handleUpdateMutationRate}
                  iteration={this.state.iteration}
                  distance={this.state.distance}
                  running={this.state.running}
                />
              </div>
              <div className="col">
                <Grid
                  start={this.state.start}
                  onUpdateCell={this.handleUpdateCell}
                  activeCells={this.state.active}
                  solution={this.state.solution}
                  GRID_WIDTH={this.GRID_WIDTH}
                  GRID_HEIGHT={this.GRID_HEIGHT}
                />
              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }

  handleUpdateMutationRate = (mutationRate) => {
    this.setState({ mutationRate });
  };

  handleUpdateWinners = (winnersSize) => {
    this.setState({ winnersSize });
  };

  handleUpdateChildren = (childrenSize) => {
    this.setState({ childrenSize });
  };

  handleUpdatePop = (popSize) => {
    this.setState({ popSize });
  };

  handleUpdateInterval = (intervalTime) => {
    this.setState({ intervalTime });
  };

  handleClearGrid = () => {
    this.activeCells.clear();
    this.setState({
      active: this.activeCells,
      solution: null,
      iteration: 0,
      distance: 0,
    });
    this.geneticAlgorithm = undefined;
    clearInterval(this.interval);
    this.setState({ running: false });
  };

  handleUpdateCell = (cellIdx) => {
    if (this.activeCells.has(cellIdx)) {
      this.activeCells.delete(cellIdx);
      this.setState({ active: this.activeCells });
    } else {
      this.activeCells.add(cellIdx);
      this.setState({ active: this.activeCells });
    }
  };

  handlePause = () => {
    clearInterval(this.interval);
    this.setState({ running: false });
  };

  handleStart = () => {
    if (this.geneticAlgorithm === undefined) {
      this.initialiseAlgorithm();
    }
    if (this.state.active.size === 0) {
      return;
    }
    this.setState({ running: true });
    this.interval = setInterval(() => {
      this.nextGeneration();
    }, this.state.intervalTime);
  };

  initialiseAlgorithm = () => {
    this.points = [];
    this.activeCells.forEach((id) => this.cellIdxToCoords(id));
    this.geneticAlgorithm = new GeneticAlgorithm(
      this.points,
      this.state.popSize,
      this.state.childrenSize,
      this.state.winnersSize,
      this.mutationRate
    );
    this.getSolution();
  };

  cellIdxToCoords = (id) => {
    let y = Math.floor((id - 1) / this.GRID_WIDTH);
    let x = (id - 1) % this.GRID_WIDTH;
    this.points.push([x, y]);
  };

  nextGeneration = () => {
    if (typeof this.geneticAlgorithm !== "undefined") {
      this.geneticAlgorithm.nextGeneration();
      this.getSolution();
    }
  };

  getSolution = () => {
    // Obtain the first solution
    let solution = [];
    let indices = this.geneticAlgorithm.population[0].solution;
    for (let i = 0; i < indices.length; i++) {
      solution.push(this.geneticAlgorithm.points[indices[i]]);
    }
    this.setState({
      solution,
      iteration: this.geneticAlgorithm.iteration,
      distance: this.geneticAlgorithm.population[0].distance,
    });
  };
}

export default Container;
