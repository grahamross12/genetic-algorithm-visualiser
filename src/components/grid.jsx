import React, { Component } from "react";
import "./grid.css";
import GeneticAlgorithm from "../genetic-algorithm.js";

// Define parameters for the genetic algorithm
const ITERATIONS = 100;
const POP = 20;
const CHILDREN = 10;
const WINNERS = 5;
const MUTATION_PROB = 0.1;

class Grid extends Component {
  constructor(props) {
    super(props);
    this.activeCells = new Set();
    this.GRID_WIDTH = 26;
    this.GRID_HEIGHT = 20;
    this.intervalTime = 10;
    this.GRID_PIXELS = 26;
    this.state = {
      grid: this.createGrid(this.GRID_WIDTH, this.GRID_HEIGHT),
      active: this.activeCells,
      showLines: false,
      showInfo: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="grid" id="grid">
          {this.state.grid.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cellValue, cellIdx) => (
                <div
                  key={cellIdx}
                  id={cellIdx}
                  className="cell"
                  onClick={() => this.activateCell(cellValue)}
                >
                  <span
                    className={`dot ${
                      this.activeCells.has(cellValue) ? "cell-active" : ""
                    }`}
                  ></span>
                </div>
              ))}
            </div>
          ))}
          {this.state.showLines ? this.handleAddLine() : <div></div>}
        </div>

        {this.state.showInfo ? (
          <div>
            <p>Iteration: {this.state.iteration}</p>
            <p>
              Distance:{" "}
              {Math.round(this.geneticAlgorithm.population[0].distance)}
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </React.Fragment>
    );
  }

  handleAddLine = () => {
    this.getSolution();
    let lines = [];
    for (let i = 0; i < this.solution.length; i++) {
      if (i !== this.solution.length - 1) {
        lines.push(this.createLine(this.solution[i], this.solution[i + 1]));
      } else {
        lines.push(this.createLine(this.solution[i], this.solution[0]));
      }
    }
    return lines;
  };

  createLine = (p1, p2) => {
    let line = (
      <div className="lineDiv">
        <svg className="svg">
          <line
            key={[p1, p2]}
            x1={this.GRID_PIXELS / 2 + this.GRID_PIXELS * p1[0]}
            y1={this.GRID_PIXELS / 2 + this.GRID_PIXELS * p1[1]}
            x2={this.GRID_PIXELS / 2 + this.GRID_PIXELS * p2[0]}
            y2={this.GRID_PIXELS / 2 + this.GRID_PIXELS * p2[1]}
            className="line"
          />
        </svg>
      </div>
    );
    return line;
  };

  nextGeneration = () => {
    if (typeof this.geneticAlgorithm !== "undefined") {
      this.geneticAlgorithm.nextGeneration();
      this.handleAddLine();
      this.setState({
        showLines: true,
        iteration: this.geneticAlgorithm.iteration,
      });
    }
  };

  clearGrid = () => {
    this.activeCells.clear();
    this.setState({ active: this.activeCells });
    this.geneticAlgorithm = undefined;
    this.clearLines();
    clearInterval(this.interval);
  };

  clearLines = () => {
    this.setState({ showLines: false, showInfo: false });
  };

  createGrid(width, height) {
    let counter = 1;
    const grid = [];
    for (let row = 0; row < height; row++) {
      const currentRow = [];
      for (let col = 0; col < width; col++) {
        currentRow.push(counter++);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  start = () => {
    this.points = [];
    this.activeCells.forEach((id) => this.cellIdxToCoords(id));
    this.geneticAlgorithm = new GeneticAlgorithm(
      this.points,
      ITERATIONS,
      POP,
      CHILDREN,
      WINNERS,
      MUTATION_PROB
    );
    console.log(this.activeCells);
    this.setState({ showLines: true, showInfo: true });
    this.interval = setInterval(() => {
      this.nextGeneration();
    }, this.intervalTime);
  };

  getSolution = () => {
    // Obtain the first solution
    let solution = [];
    let indices = this.geneticAlgorithm.population[0].solution;
    for (let i = 0; i < indices.length; i++) {
      solution.push(this.geneticAlgorithm.points[indices[i]]);
    }
    this.solution = solution;
  };

  cellCoordsToIdx = (coords) => {
    let idx = coords[1] * this.GRID_WIDTH;
    idx += coords[0];
    return idx;
  };

  cellIdxToCoords = (id) => {
    let y = Math.floor((id - 1) / this.GRID_WIDTH);
    let x = (id - 1) % this.GRID_WIDTH;
    this.points.push([x, y]);
  };

  activateCell = (cellValue) => {
    if (this.activeCells.has(cellValue)) {
      this.setState({ active: this.activeCells.delete(cellValue) });
    } else {
      this.setState({ active: this.activeCells.add(cellValue) });
    }
  };
}

export default Grid;
