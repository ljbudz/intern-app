import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import ApplicationCreate from "./pages/ApplicationCreate";
import ApplicationEdit from "./pages/ApplicationEdit";
import ApplicationDelete from "./pages/ApplicationDelete";
import ApplicationList from "./pages/ApplicationList";
import ApplicationShow from "./pages/ApplicationShow";
import Landing from "./Landing";

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
        {/* <ProtectedRoute
          path="/applications/edit/:id"
          exact
          component={ApplicationEdit}
        ></ProtectedRoute> */}
        {/* <ProtectedRoute
          path="/applications/delete/:id"
          exact
          component={ApplicationDelete}
        ></ProtectedRoute> */}
        <Route exact path="/" component={Landing} />
        <Redirect to="/" />
      </Switch>
    );
  }
}

export default Routes;
