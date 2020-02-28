import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h5">Intern.io</Typography>
        <GoogleAuth />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
