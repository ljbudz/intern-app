import React from "react";
import Emoji from "a11y-react-emoji";

const CustomEmoji = props => {
  return <Emoji symbol={props.symbol} style={{ color: "white" }} />;
};

export default CustomEmoji;
