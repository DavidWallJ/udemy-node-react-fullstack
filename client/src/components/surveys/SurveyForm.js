// SurveyFrom shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// Field can be used with most HTML input
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	}
	// note that there are no () on 'onSurveySubmit'
	// because we're not using a fat arrow function
	// we could use a fat arrow function and then use 'onSurveySubmit()'
	// we don't want the function to be called right away
	// only once 'onSubmit' has been called
	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}

					<Link to="/surveys" className="red btn-flat left white-text">
						Cancel
						<i className="material-icons right">clear</i>
					</Link>

					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons right">chevron_right</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	// order of these validation checks do count
	errors.recipients = validateEmails(values.recipients || '');

	// not _.map because we're not returning a list of something
	// before we returned a list of <Field/> tags
	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});

	return errors;
}

// redux will by default clear all for elements when we navigate away from it
export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
