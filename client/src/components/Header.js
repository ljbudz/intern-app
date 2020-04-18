import React from "react";
import { connect } from "react-redux";
import { Header as GrommetHeader, Button, Box, ResponsiveContext } from "grommet";
import { EmptyCircle } from "grommet-icons";
import { logOutUser, setTheme } from "../actions";
import history from "../history";
import RoutedButton from "./RoutedButton";

class Header extends React.Component {
  onLogoutButtonClick = (e) => {
    this.props.logOutUser();
  };

  onThemeChange = () => {
    this.props.theme.mode === "light" ? this.props.setTheme("dark") : this.props.setTheme("light");
  };

  renderAuthButton(size) {
    return this.props.auth.isAuthenticated ? (
      [
        <RoutedButton
          path="/applications"
          label={size === "small" ? "Apps" : "Applications"}
          key={0}
        />,
        <Button
          path={history.location.pathname}
          onClick={this.onLogoutButtonClick}
          label="Log Out"
          primary
          key={1}
        />
      ]
    ) : (
      <RoutedButton path="/login" label="Log In" primary />
    );
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {(size) => {
          return (
            <GrommetHeader
              direction="row"
              justify="between"
              alignSelf="center"
              gap={size === "small" ? "xxsmall" : "medium"}
              pad={size === "small" ? "medium" : "large"}
            >
              <RoutedButton path="/" label="Intern.io" />
              <Box direction="row" justify="center" align="center" gap="small">
                <Button
                  icon={<EmptyCircle />}
                  gap="none"
                  label={" "}
                  onClick={this.onThemeChange}
                />
                {this.renderAuthButton(size)}
              </Box>
            </GrommetHeader>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, theme: state.theme };
};

export default connect(mapStateToProps, { logOutUser, setTheme })(Header);
