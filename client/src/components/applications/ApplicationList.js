import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Image, Header, Button, Menu } from "semantic-ui-react";
import { fetchApplications } from "../../actions";

class ApplicationList extends React.Component {
  state = { stage: 0 };

  componentDidMount() {
    this.props.fetchApplications();
  }

  renderList() {
    return this.props.applications.map(application => {
      if (application.stage === this.state.stage) {
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
      } else {
        return null;
      }
    });
  }

  handleItemClick = (e, item) => {
    this.setState({ stage: item.stage });
  };

  renderFilterMenu() {
    const { stage } = this.state;
    const filters = [
      { name: "Watching", stage: 0 },
      { name: "Applied", stage: 1 },
      { name: "Interviewed", stage: 2 },
      { name: "Offers", stage: 3 },
      { name: "Rejections", stage: 4 }
    ];

    return (
      <Menu text>
        {filters.map(({ name, stage: itemStage }, i) => {
          return (
            <Menu.Item
              name={name}
              stage={itemStage}
              active={itemStage === stage}
              onClick={this.handleItemClick}
              key={i}
            />
          );
        })}
      </Menu>
    );
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
        {this.renderFilterMenu()}
        <Card.Group itemsPerRow="2" stackable>
          {this.renderList(this.state.stage)}
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
