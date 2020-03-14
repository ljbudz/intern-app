import React from "react";
import { Field, reduxForm } from "redux-form";

class ApplicationForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter title"></Field>
        <Field name="company" component={this.renderInput} label="Enter company"></Field>
        <button>Submit</button>
      </form>
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
