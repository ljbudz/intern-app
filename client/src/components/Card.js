import React from "react";
//import { Link as RouterLink } from "react-router-dom";
import { Box, Image, Heading } from "grommet";
import history from "../history";
const Card = (props) => {
  const { _id, title, company } = props.application;

  return (
    <Box
      width="medium"
      align="center"
      justify="between"
      pad="xsmall"
      round="small"
      border={{ size: "small", color: "brand" }}
      onClick={(e) => {
        e.preventDefault();
        history.push(`/applications/${_id}`);
      }}
    >
      <Box height="small" width="small" pad="xsmall">
        <Image
          fit="contain"
          src={`//logo.clearbit.com/${company.name}.com?size=500`}
          fallback="/company.png"
          fill
        />
      </Box>
      <Heading margin="small" textAlign="center" level="2">
        {title}
      </Heading>
      <Heading margin="xsmall" level="4">
        {company.name}
      </Heading>
    </Box>
  );
};

export default Card;
