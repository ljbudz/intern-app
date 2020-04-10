import React from "react";
import { connect } from "react-redux";
import { logInUser } from "../../actions";
import AuthForm from "./AuthForm";
import history from "../../history";

class Login extends React.Component {
  onSubmit = (formValues) => {
    this.props.logInUser(formValues);
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      history.push("/applications");
    }
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      history.push("/applications");
    }
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <AuthForm onSubmit={this.onSubmit} cancelLink="/" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logInUser })(Login);
