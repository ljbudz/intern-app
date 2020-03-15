import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button, Message } from "semantic-ui-react";

class ApplicationForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = meta.error && meta.touched ? "error" : "";

    return (
      <Form.Field className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </Form.Field>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return <Message negative content={error} />;
    }
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter title"></Field>
        <Field name="company" component={this.renderInput} label="Enter company"></Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const validate = formValues => {
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
