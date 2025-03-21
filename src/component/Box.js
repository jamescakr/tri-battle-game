import React, { Component } from "react";

class Box extends Component {
  render() {
    const { title, item, result, showResult } = this.props;

    const resultStyle = {
      visibility: showResult ? "visible" : "hidden",
      color: result === "win" ? "blue" : result === "lose" ? "red" : "black",
      fontSize: "48px",
    };

    return (
      <div className={`Box-box ${item ? "fade-in-up" : ""}`}>
        <h1> {title} </h1>
        <img src={item ? item.img : null} className="Box-img-size" />
        <h2 style={resultStyle}>{result}</h2>
      </div>
    );
  }
}

export default Box;
