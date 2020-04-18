import React from "react";
import { connect } from "react-redux";
import { fetchApplication } from "../../actions";
import { Box, Heading, Avatar, Meter, Stack, Text, Grid } from "grommet";
import RoutedButton from "../RoutedButton";

class ApplicationShow extends React.Component {
  componentDidMount() {
    this.props.fetchApplication(this.props.match.params.id);
  }

  renderCompanyReviews(reviews) {
    if (Object.keys(reviews).length === 0) {
      return null;
    }

    return Object.keys(reviews).map((key) => {
      return (
        <Box align="center" key={key} flex="grow">
          <Stack anchor="center">
            <Meter
              type="circle"
              values={[
                {
                  value: Number(reviews[key])
                }
              ]}
              max={5}
              round
              size="xsmall"
              thickness="small"
            />
            <Box align="center" pad={{ bottom: "xsmall" }}>
              <Text size="xlarge">{reviews[key]}</Text>
            </Box>
          </Stack>
          <Box align="center">
            <Text size="small">{key}</Text>
          </Box>
        </Box>
      );
    });
  }

  render() {
    if (!this.props.application) {
      return <div className="spinner-container"></div>;
    }

    const { title, company, stage, _id } = this.props.application;

    return (
      <Box height="large" pad="medium" fill>
        <Avatar src={`//logo.clearbit.com/${company.name}.com`} />
        <Heading level="1">{title}</Heading>
        <Heading level="5">{company.name}</Heading>
        <Box direction="row" align="center" gap="small" pad="small">
          <RoutedButton path={`/applications/edit/${_id}`} label="Edit" />
          <RoutedButton path={`/applications/delete/${_id}`} label="Delete" />
        </Box>
        <Grid columns="small" gap="none" align="center">
          {this.renderCompanyReviews(company.reviews)}
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { application: state.applications[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchApplication })(ApplicationShow);
