import React from "react";
import { connect } from "react-redux";
import { Box, Heading } from "grommet";
import { createApplication } from "../../actions";
import ApplicationForm from "./ApplicationForm";

class ApplicationCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createApplication(formValues);
  };

  render() {
    return (
      <Box direction="column" align="center" justify="center">
        <Box width="medium">
          <Heading level="2">Create Application</Heading>
          <ApplicationForm onSubmit={this.onSubmit} cancelLink="/applications" />
        </Box>
      </Box>
    );
  }
}

export default connect(null, { createApplication })(ApplicationCreate);
