// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	// we don't need to use the full constructor code because of create-react-app
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}

		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

// we use redux form in this specific comonent because
// when we navigate away from 'SurveyNew' back to dashboard
// all the fields will be destroyed
// we don't have to add 'destroyOnUnmount: true' because it is default
// but i've left it here so we can compare between 'SurveyNew' and 'SurveyForm'
export default reduxForm({
	form: 'surveyForm',
	destroyOnUnmount: true
})(SurveyNew);
