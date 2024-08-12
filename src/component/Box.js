import React from "react";

const Box = (props) => {
  console.log("proppps", props);

  return (
    <div className="box">
      <h1> {props.title} </h1>
      <img src={props.item ? props.item.img : null} className="img-size" />
      <h2> win </h2>
    </div>
  );
};

export default Box;
