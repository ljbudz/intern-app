import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchApplication, deleteApplication } from "../../actions";
import { Button } from "semantic-ui-react";
import Modal from "../Modal";
import history from "../../history";

class ApplicationDelete extends React.Component {
  componentDidMount() {
    this.props.fetchApplication(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <>
        <Button negative onClick={() => this.props.deleteApplication(id)}>
          Delete
        </Button>
        <Button as={Link} to={`/applications/${this.props.match.params.id}`}>
          Cancel
        </Button>
      </>
    );
  }

  renderContent() {
    if (!this.props.application) {
      return "Are you sure you want to delete this application?";
    } else {
      return `Are you sure you want to delete your application for ${this.props.application.title} at ${this.props.application.company}?`;
    }
  }

  render() {
    return (
      <Modal
        title="Delete Application"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/applications/${this.props.match.params.id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { application: state.applications[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchApplication, deleteApplication })(ApplicationDelete);
