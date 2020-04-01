import React from "react";
import { Steps } from "antd";
import "antd/dist/antd.css";
const { Step } = Steps;

class CustomStepper extends React.Component {
  state = {
    windowWidth: 0
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    this.setState({ windowWidth });
  };

  renderSteps = () => {
    return this.props.steps.map((step, i) => {
      return <Step {...step} key={i} />;
    });
  };

  render() {
    return (
      <Steps
        current={this.props.current}
        direction={this.state.windowWidth > 992 ? "horizontal" : "vertical"}
      >
        {this.renderSteps()}
      </Steps>
    );
  }
}

export default CustomStepper;
