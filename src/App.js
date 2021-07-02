import React from "react";
import NavBar from "./components/navbar";
import Grid from "./components/grid";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container grid-box">
        <Grid />
      </main>
    </React.Fragment>
  );
}

export default App;
