import React from "react";
import { connect } from "react-redux";
import { fetchApplication } from "../../actions";
import { Link } from "react-router-dom";
import { Item, Loader, Button } from "semantic-ui-react";
import Stepper from "../ui/Stepper";
import Emoji from "../ui/Emoji";

class ApplicationShow extends React.Component {
  componentDidMount() {
    this.props.fetchApplication(this.props.match.params.id);
  }

  steps = [
    {
      title: "Watching",
      subTitle: <Emoji symbol={"🕑"} />,
      description: "Reviewing job posting."
    },
    {
      title: "Applied",
      subTitle: <Emoji symbol={"📆"} />,
      description: "Submitted resume and cover letter."
    },
    {
      title: "Response",
      subTitle: <Emoji symbol={"💬"} />,
      description: "Company responded with interview or rejection."
    },
    {
      title: "Interviewed",
      subTitle: <Emoji symbol={"👔"} />,
      description: "Interviewed with the company."
    },
    {
      title: "Final Decision",
      subTitle: <Emoji symbol={"✅"} />,
      description: "Final decision made."
    }
  ];

  render() {
    if (!this.props.application) {
      return (
        <Loader active size="medium">
          Loading...
        </Loader>
      );
    }

    const { title, company, stage, _id } = this.props.application;

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
              <Button className="button-blue" as={Link} to={`/applications/edit/${_id}`}>
                Edit
              </Button>
              <Button negative as={Link} to={`/applications/delete/${_id}`}>
                Delete
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
        <Item>
          <Item.Content>
            <Stepper current={stage} steps={this.steps} />
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
