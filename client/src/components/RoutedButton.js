import React from "react";
import { Button } from "grommet";
import history from "../history";

const RoutedButton = ({ alignSelf, children, fill, icon, label, path, plain, ...rest }) => {
  return (
    <Button
      href={path}
      onClick={(e) => {
        e.preventDefault();
        history.push(path);
      }}
      alignSelf={alignSelf}
      fill={fill}
      icon={icon}
      label={label}
      plain={plain}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default RoutedButton;
