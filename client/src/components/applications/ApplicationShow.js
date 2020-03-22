import React from "react";
import { connect } from "react-redux";
import { fetchApplication } from "../../actions";
import { Link } from "react-router-dom";
import { Item, Loader, Button, Progress } from "semantic-ui-react";

class ApplicationShow extends React.Component {
  componentDidMount() {
    this.props.fetchApplication(this.props.match.params.id);
  }

  render() {
    if (!this.props.application) {
      return (
        <Loader active size="medium">
          Loading...
        </Loader>
      );
    }

    const { title, company, id } = this.props.application;

    return (
      <Item.Group>
        <Item>
          <Item.Image
            size="small"
            src={`//logo.clearbit.com/${company}.com`}
            onError={e => (e.target.src = "/company.png")}
          />
          <Item.Content>
            <Item.Header as="h2">{title}</Item.Header>
            <Item.Meta>{company}</Item.Meta>
            <Item.Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, dolorem!
            </Item.Description>
            <Item.Extra>
              <Button primary as={Link} to={`/applications/edit/${id}`}>
                Edit
              </Button>
              <Button negative as={Link} to={`/applications/delete/${id}`}>
                Delete
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Progress percent={100} label="test"></Progress>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { application: state.applications[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchApplication })(ApplicationShow);
