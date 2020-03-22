import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Image, Header, Button } from "semantic-ui-react";
import { fetchApplications } from "../../actions";

class ApplicationList extends React.Component {
  componentDidMount() {
    this.props.fetchApplications();
  }

  renderList() {
    return this.props.applications.map(application => {
      return (
        <Card
          fluid
          key={application._id}
          as={Link}
          to={`/applications/${application._id}`}
          raised={true}
        >
          <Card.Content>
            <Image
              floated="left"
              verticalAlign="middle"
              size="mini"
              src={`//logo.clearbit.com/${application.company}.com`}
              onError={e => (e.target.src = "company.png")}
            />
            <Card.Header>{application.title}</Card.Header>
            <Card.Meta>{application.company}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, dignissimos.
            </Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h1">
          My Applications
          <Button floated="right" as={Link} to="/applications/new">
            Create
          </Button>
        </Header>
        <Card.Group itemsPerRow="2" stackable>
          {this.renderList()}
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    applications: Object.values(state.applications),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { fetchApplications })(ApplicationList);
