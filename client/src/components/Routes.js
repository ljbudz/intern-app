import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import ApplicationCreate from "./applications/ApplicationCreate";
import ApplicationEdit from "./applications/ApplicationEdit";
import ApplicationDelete from "./applications/ApplicationDelete";
import ApplicationList from "./applications/ApplicationList";
import ApplicationShow from "./applications/ApplicationShow";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" exact component={Register}></Route>
        <ProtectedRoute path="/applications" exact component={ApplicationList}></ProtectedRoute>
        <ProtectedRoute
          path="/applications/new"
          exact
          component={ApplicationCreate}
        ></ProtectedRoute>
        <ProtectedRoute path="/applications/:id" exact component={ApplicationShow}></ProtectedRoute>
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
    );
  }
}

export default Routes;
