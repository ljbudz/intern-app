import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApplicationCreate from "./applications/ApplicationCreate";
import ApplicationEdit from "./applications/ApplicationEdit";
import ApplicationDelete from "./applications/ApplicationDelete";
import ApplicationList from "./applications/ApplicationList";
import ApplicationShow from "./applications/ApplicationShow";
import Header from "./Header";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={ApplicationList}></Route>
            <Route path="/applications/new" exact component={ApplicationCreate}></Route>
            <Route path="/applications/:id" exact component={ApplicationShow}></Route>
            <Route path="/applications/edit/:id" exact component={ApplicationEdit}></Route>
            <Route path="/applications/delete/:id" exact component={ApplicationDelete}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
