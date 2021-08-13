import React, { Component } from "react";
import "./grid.css";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.activeCells = new Set();

    this.GRID_PIXELS = 26;
    this.state = {
      grid: this.createGrid(this.props.GRID_WIDTH, this.props.GRID_HEIGHT),
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
                  onMouseEnter={() => this.handleHoverOn(cellValue)}
                  onMouseLeave={this.handleHoverOff}
                  className="cell"
                  onClick={() => this.props.onUpdateCell(cellValue)}
                >
                  <span className={this.handleDotClass(cellValue)}></span>
                </div>
              ))}
            </div>
          ))}
          {this.props.solution ? this.handleAddLine() : <div></div>}
        </div>
      </React.Fragment>
    );
  }

  handleDotClass = (cellValue) => {
    if (this.props.activeCells.has(cellValue)) {
      return "dot cell-active";
    } else if (this.state.isHovered === cellValue) {
      return "dot cell-hovered";
    } else {
      return "dot";
    }
  };

  handleHoverOff = () => {
    this.setState({ isHovered: null });
  };

  handleHoverOn = (cellValue) => {
    this.setState({
      isHovered: cellValue,
    });
  };

  handleAddLine = () => {
    let lines = [];
    for (let i = 0; i < this.props.solution.length; i++) {
      if (i !== this.props.solution.length - 1) {
        lines.push(
          this.createLine(this.props.solution[i], this.props.solution[i + 1])
        );
      } else {
        lines.push(
          this.createLine(this.props.solution[i], this.props.solution[0])
        );
      }
    }
    return lines;
  };

  createLine = (p1, p2) => {
    let line = (
      <div className="lineDiv" key={[p1, p2]}>
        <svg className="svg" key={[p1, p2]}>
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
}
export default Grid;
