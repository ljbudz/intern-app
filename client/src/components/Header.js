import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { logOutUser } from "../actions";
import history from "../history";

class Header extends React.Component {
  onLogoutButtonClick = (e) => {
    this.props.logOutUser();
  };

  renderAuthButton() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Link to={history.location.pathname} className="item" onClick={this.onLogoutButtonClick}>
          Log Out
        </Link>
      );
    } else {
      return (
        <>
          <Link to="/login" className="item">
            Log In
          </Link>
          <Link to="/register" className="item">
            Sign Up
          </Link>
        </>
      );
    }
  }

  render() {
    return (
      <Menu fixed="top" secondary style={{ backgroundColor: "white" }}>
        <Link to="/" className="item">
          Intern.io
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/applications">Apps</Link>
            {this.renderAuthButton()}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logOutUser })(Header);
