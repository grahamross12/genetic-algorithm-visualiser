import React, { Component } from "react";
import "./grid.css";

class Grid extends Component {
  state = {};
  render() {
    const GRID_HEIGHT = 100;
    const GRID_WIDTH = 100;

    const grid = new Array(GRID_HEIGHT)
      .fill(0)
      .map(() => new Array(GRID_WIDTH).fill(0));
    console.log(grid);

    return (
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} className="cell"></div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Grid;
