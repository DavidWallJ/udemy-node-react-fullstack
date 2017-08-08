const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
	emails = emails.replace(/,\s*$/, '');
	const invalidEmails = emails
		.split(',')
		.map(email => email.trim())
		// we're capturing the emails that fail this test
		// keep invalid emails
		.filter(email => re.test(email) === false);

	if (invalidEmails.length) {
		return `These emails are invalide: ${invalidEmails}`;
	}

	return;
};
