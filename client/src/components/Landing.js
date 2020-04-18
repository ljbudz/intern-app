import React from "react";
import { Image, Box, Text, Grid, Heading } from "grommet";
import CareerDevelopmentSVG from "../svg/undraw_career_development_oqcb.svg";

class Landing extends React.Component {
  render() {
    return (
      <Box justify="start" pad="small">
        <Box justify="center" align="center" pad={{ top: "xlarge" }}>
          <Heading justify="center">Welcome to Intern.io</Heading>
        </Box>
        <Box height="medium">
          <Image fit="contain" src={CareerDevelopmentSVG} />
        </Box>
      </Box>
    );
  }
}

export default Landing;
