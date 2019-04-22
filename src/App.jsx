import React, { Component } from "react";
import "./App.css";
import HorizontalScrollLayout from "./container/horizontal-scroll";

const stubPages = [
  <div>Coucou 1</div>,
  <div>Coucou 2</div>,
  <div>Coucou 3</div>
];

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h1
          style={{
            margin: 0
          }}
        >
          Horizontal scroll
        </h1>
        <HorizontalScrollLayout pages={stubPages} />
      </div>
    );
  }
}

export default App;
