import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, FormField, TextInput, Button, Box } from "grommet";
import RoutedButton from "../RoutedButton";

class ApplicationForm extends React.Component {
  renderInput = ({ input, label, meta, ...rest }) => {
    const hasError = meta.error && meta.touched;
    return (
      <FormField label={label} error={hasError ? meta.error : false}>
        <TextInput {...input} {...rest} />
      </FormField>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter title"></Field>
        <Field name="company" component={this.renderInput} label="Enter company"></Field>
        <Box direction="row" justify="center" pad="small" gap="small">
          <Button type="submit" label="Submit" />
          <RoutedButton path={this.props.cancelLink} label="Cancel" />
        </Box>
      </Form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.company) {
    errors.company = "You must enter a company name";
  }

  return errors;
};

export default reduxForm({
  form: "ApplicationForm",
  validate
})(ApplicationForm);
