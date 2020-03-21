import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import { Menu } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu fixed="top" secondary style={{ backgroundColor: "white" }}>
      <Link to="/" className="item">
        Intern.io
      </Link>
      <Menu.Menu position="right">
        <Menu.Item>
          <GoogleAuth />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
