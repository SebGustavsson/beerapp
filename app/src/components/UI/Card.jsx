import "./Card.css";

import React from "react";

const Card = (props) => {
  return <div className="componentCard">{props.children}</div>;
};

export default Card;
