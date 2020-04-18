import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, FormField, TextInput, Button, Box } from "grommet";

class AuthForm extends React.Component {
  renderInput = ({ input, label, meta, ...rest }) => {
    const hasError = meta.error && meta.touched;
    return (
      <FormField label={label} error={hasError ? meta.error : false}>
        {rest.type === "email" ? (
          <TextInput {...input} {...rest} name="email" />
        ) : (
          <TextInput {...input} {...rest} name="password" />
        )}
      </FormField>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="email" component={this.renderInput} label="Email"></Field>
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
        ></Field>
        <Box direction="row" justify="center" pad="small">
          <Button type="submit" label="submit" />
        </Box>
      </Form>
    );
  }
}

const validate = (formValues) => {
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
