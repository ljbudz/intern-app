import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./auth/Login";
import Register from "./auth/Register";

import ProtectedRoute from "./ProtectedRoute";
import ApplicationCreate from "./applications/ApplicationCreate";
import ApplicationEdit from "./applications/ApplicationEdit";
import ApplicationDelete from "./applications/ApplicationDelete";
import ApplicationList from "./applications/ApplicationList";
import ApplicationShow from "./applications/ApplicationShow";

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
            <Switch>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/register" exact component={Register}></Route>
              <ProtectedRoute
                path="/applications"
                exact
                component={ApplicationList}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/applications/new"
                exact
                component={ApplicationCreate}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/applications/:id"
                exact
                component={ApplicationShow}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/applications/edit/:id"
                exact
                component={ApplicationEdit}
              ></ProtectedRoute>
              <ProtectedRoute
                path="/applications/delete/:id"
                exact
                component={ApplicationDelete}
              ></ProtectedRoute>
            </Switch>
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
