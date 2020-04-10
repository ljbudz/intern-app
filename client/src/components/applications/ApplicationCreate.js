import React from "react";
import { connect } from "react-redux";
import { createApplication } from "../../actions";
import ApplicationForm from "./ApplicationForm";

class ApplicationCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createApplication(formValues);
  };

  render() {
    return (
      <div>
        <h1>Create Application</h1>
        <ApplicationForm onSubmit={this.onSubmit} cancelLink="/" />
      </div>
    );
  }
}

export default connect(null, { createApplication })(ApplicationCreate);
