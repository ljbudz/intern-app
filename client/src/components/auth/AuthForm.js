import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";

class AuthForm extends React.Component {
  renderInput = ({ input, label, meta, type }) => {
    const className = meta.error && meta.touched ? "error" : "";

    return (
      <Form.Field className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return <Message negative content={error} />;
    }
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="email" component={this.renderInput} label="Enter an email" type="text"></Field>
        <Field
          name="password"
          component={this.renderInput}
          label="Enter a password"
          type="password"
        ></Field>
        <div>
          <Button color="blue" type="submit">
            Submit
          </Button>
          <Button negative as={Link} to={this.props.cancelLink}>
            Cancel
          </Button>
        </div>
      </Form>
    );
  }
}

const validate = (formValues, props) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "You must enter an email";
  }

  if (!formValues.password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

export default reduxForm({
  form: "AuthForm",
  validate
})(AuthForm);
