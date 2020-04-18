import React from "react";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import Routes from "./Routes";
import Header from "./Header";
import history from "../history";
import { getCurrentUserData } from "../actions";
import { Grommet, Footer, Anchor, Text, Box } from "grommet";
import { grommet, dark } from "grommet/themes";
import Emoji from "./ui/Emoji";

import "./App.css";
class App extends React.Component {
  state = {
    initialized: false
  };

  THEME = {
    light: grommet,
    dark: dark
  };

  componentDidMount() {
    this.props.getCurrentUserData();
  }

  componentDidUpdate() {
    if (!this.state.initialized && !this.props.auth.loading) {
      this.setState({ initialized: true });
    }
  }

  render() {
    if (!this.state.initialized) {
      return <div>Loading...</div>;
    }

    return (
      <Router history={history}>
        <Grommet theme={this.THEME[this.props.theme.mode] || grommet} full>
          <Header />
          <Routes />
          <Box align="center" pad="large">
            <Footer
              direction="row"
              justify="center"
              pad={{ bottom: "small" }}
              pad={{ top: "xlarge" }}
            >
              <Text textAlign="center">
                Created by Lucas <Emoji symbol="☕️" />
              </Text>
              {"|"}
              <Anchor href="https://clearbit.com" label="Logos provided by Clearbit" />
            </Footer>
          </Box>
        </Grommet>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, theme: state.theme };
};

export default connect(mapStateToProps, { getCurrentUserData })(App);
