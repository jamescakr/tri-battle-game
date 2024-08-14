import React from "react";

const Box = (props) => {
  return (
    <div className={`Box-box ${props.item ? "fade-in-up" : ""}`}>
      <h1> {props.title} </h1>
      <img src={props.item ? props.item.img : null} className="Box-img-size" />
      <h2 style={{ visibility: props.showResult ? "visible" : "hidden" }}>
        {props.result}
      </h2>
    </div>
  );
};

export default Box;
