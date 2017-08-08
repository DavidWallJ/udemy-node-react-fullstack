// SurveyFormReview shows users their for minputs for review
// SureveyFormReview isn't included in the react-router 'Routes' in 'App.js'
// thus, we need to 'teach' this component using { withRouter }
// this will give us access to the history object provided by react-router-dom
// it's on the props object
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

// this is not a component so we have to access the this.props here for the 'onClick()' below
// thus we need to pass in 'formValues', 'submitSurvey' action creator into 'SurveyFormReview'
// from mapStateToProps
// history is being passed to the actio creator
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = _.map(formFields, ({ name, label }) => {
		return (
			<div key={name}>
				<label>
					{label}
				</label>
				<div>
					{formValues[name]}
				</div>
			</div>
		);
	});
	// we don't want 'submitSurvey' to be called right away
	// thus () => submitSurvey(formValues)
	return (
		<div>
			<h5>Please confirm your entries.</h5>
			{reviewFields}
			<button
				className="yellow darken-3 btn-flat left white-text"
				onClick={onCancel}
			>
				Back
				<i className="material-icons left">chevron_left</i>
			</button>
			<button
				onClick={() => submitSurvey(formValues, history)}
				className="green btn-flat right white-text"
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		formValues: state.form.surveyForm.values
	};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
