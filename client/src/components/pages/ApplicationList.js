import React from "react";
import { connect } from "react-redux";
import { fetchApplications } from "../../actions";
import { Tabs, Tab, Heading, Grid, ResponsiveContext, Box } from "grommet";
import RoutedButton from "../RoutedButton";
import { Overview } from "grommet-icons";
import Card from "../Card";

class ApplicationList extends React.Component {
  state = {
    currentTab: 0
  };

  tabs = [
    { title: "Watching", stage: 0, icon: <Overview /> },
    { title: "Applied", stage: 1 },
    { title: "Interviewed", stage: 2 },
    { title: "Offers", stage: 3 },
    { title: "Rejections", stage: 4 }
  ];

  componentDidMount() {
    this.props.fetchApplications();
  }

  handleTabChange = (e, newValue) => {
    this.setState({
      currentTab: newValue
    });
  };

  renderTabs() {
    return this.tabs.map(({ title, stage }) => {
      return (
        <Tab title={title} key={stage}>
          <Grid columns="small" gap="small" justify="start" pad={{ vertical: "medium" }}>
            {this.renderCard(stage)}
          </Grid>
        </Tab>
      );
    });
  }

  renderCard(stage) {
    return this.props.applications.map((application) => {
      if (application.stage === stage) {
        return <Card application={application} key={application._id} />;
      } else {
        return null;
      }
    });
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {(size) => {
          return (
            <Box pad={size === "small" ? "small" : "medium"}>
              <Box direction="row" justify="start" align="center" gap="medium">
                <Heading level="1">My Applications</Heading>
                <RoutedButton path="/applications/new" label="New" primary />
              </Box>
              <Tabs>{this.renderTabs()}</Tabs>
            </Box>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    applications: Object.values(state.applications),
    userId: state.auth.user._id,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps, { fetchApplications })(ApplicationList);
