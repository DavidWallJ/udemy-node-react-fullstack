const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// we want to add on to 'Mail' provided by sendgrid
// when 'new Mailer' is run in another file
// the constructor function is automatically run
// the constructor will also recieve the arguments passed in
class Mailer extends helper.Mail {
	// content = the html templated passed in
	// subject and recipients are pulled off the (deconstructured) 'survey' object passed in
	constructor({ subject, recipients }, content) {
		// es2015
		super();
		// sendgrid required content
		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('no-reply@emailassistant.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);
		console.log('HERE: ', this.recipients);
		// 'helper.Mail' helper function
		this.addContent(this.body);

		// enable click tracking in email
		// inform us if they click 'yes' or 'no'
		// our own helper function
		this.addClickTracking();

		// 'helper.Mail' helper function
		this.addRecipients();
	}
	// we only want to pull the emails out of our recipients object
	// thus, the destructuring
	// we now have an array of emails (i think)
	formatAddresses(recipients) {
		//es6 destructuring requires extra parens if you're doing an arrow function
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	// this is basically copy paste from the sendgrid documentation
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		const personalize = new helper.Personalization();
		// iterate over list and make use of personalize object for each
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}

	async send() {
		console.log('send got called');
		const request = await this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		// API provided by sendgrid object
		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
