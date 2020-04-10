import React from "react";
import { connect } from "react-redux";
//import { registerUser } from "../../actions";
import AuthForm from "./AuthForm";

class Register extends React.Component {
  onSubmit = (formValues) => {
    // this.props.registerUser(formValues);
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <AuthForm onSubmit={this.onSubmit} cancelLink="/" />
      </div>
    );
  }
}

export default connect(null, {})(Register);
