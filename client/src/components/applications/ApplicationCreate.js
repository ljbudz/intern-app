import React from "react";
import { connect } from "react-redux";
import { createApplication } from "../../actions";
import ApplicationForm from "./ApplicationForm";

class ApplicationCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createApplication(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create Application</h3>
        <ApplicationForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createApplication })(ApplicationCreate);
