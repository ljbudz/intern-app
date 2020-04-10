import React from "react";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import Routes from "./Routes";
import Header from "./Header";
import history from "../history";
import { getCurrentUserData } from "../actions";
import { Container, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    initialized: false
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
      return (
        <Loader active size="medium">
          Loading...
        </Loader>
      );
    }

    return (
      <Container>
        <Router history={history}>
          <div style={{ paddingTop: "70px" }}>
            <Header />
            <Routes />
          </div>
        </Router>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { getCurrentUserData })(App);
