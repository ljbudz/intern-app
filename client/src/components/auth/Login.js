import React from "react";
import { connect } from "react-redux";
import { Box, Heading } from "grommet";
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
      <Box align="center" justify="center" pad={{ bottom: "xlarge" }}>
        <Box width="medium">
          <Heading level="2">Login</Heading>
          <AuthForm onSubmit={this.onSubmit} />
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { logInUser })(Login);
