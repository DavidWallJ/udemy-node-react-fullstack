// SurveyField contains logic to render a single label and text input
import React from 'react';

// this is actually being rendered by the 'Field' tag in 'SurveyForm'
// thus, it has access to props from redux form
// by passing ...input injects all the props on props.input into the input below
// you can find the errors from redux form on the meta property
// two level deep destructuring on meta
// if 'touched' is false we won't get the error4we43
export default ({ input, label, meta: { error, touched } }) => {
	return (
		<div>
			<label>
				{label}
			</label>
			<input {...input} style={{ marginBottom: '5px' }} />
			<div className="red-text" style={{ marginBottom: '20px' }}>
				{touched && error}
			</div>
		</div>
	);
};
