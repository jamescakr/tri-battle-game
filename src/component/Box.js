import React from "react";

const Box = (props) => {
  return (
    <div className="Box-box">
      <h1> {props.title} </h1>
      <img src={props.item ? props.item.img : null} className="Box-img-size" />
      <h2> {props.result} </h2>
    </div>
  );
};

export default Box;
