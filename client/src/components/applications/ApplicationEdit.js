import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchApplication, editApplication } from "../../actions";
import ApplicationForm from "./ApplicationForm";
import { Loader } from "semantic-ui-react";

class ApplicationEdit extends React.Component {
  componentDidMount() {
    this.props.fetchApplication(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editApplication(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.application) {
      return (
        <Loader active size="medium">
          Loading...
        </Loader>
      );
    }
    return (
      <div>
        <h1>Edit Application</h1>
        <ApplicationForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(this.props.application, "title", "company")}
          cancelLink={`/applications/${this.props.match.params.id}`}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    application: state.applications[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchApplication, editApplication })(ApplicationEdit);
