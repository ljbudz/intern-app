import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import ApplicationCreate from "./applications/ApplicationCreate";
import ApplicationEdit from "./applications/ApplicationEdit";
import ApplicationDelete from "./applications/ApplicationDelete";
import ApplicationList from "./applications/ApplicationList";
import ApplicationShow from "./applications/ApplicationShow";
import Header from "./Header";
import history from "../history";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Login from "./Login";
import withAuth from "./withAuth";
import Secret from "./Secret";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Router history={history}>
          <div style={{ paddingTop: "70px" }}>
            <Header />
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/secret" exact component={withAuth(Secret)} />
              <Route path="/applications" exact component={ApplicationList}></Route>
              <Route path="/applications/new" exact component={ApplicationCreate}></Route>
              <Route path="/applications/:id" exact component={ApplicationShow}></Route>
              <Route path="/applications/edit/:id" exact component={ApplicationEdit}></Route>
              <Route path="/applications/delete/:id" exact component={ApplicationDelete}></Route>
            </Switch>
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
