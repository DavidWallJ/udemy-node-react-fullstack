// this entire app can be run from 'thisproject/server' using 'npm run dev'

// create-react-app requires there to be a root index.js file

// materialize-css is a node_module
// thus no relative path needed or 'from'
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
// it's difficult to use postman to test our backend '/api/surveys' routes because
// according to our app we need to be signed in and have credits
// thus, we can run axios in chrome console to access these routes
// if we include the line of code below
window.axios = axios;

// example:
//const survey = { title: 'my title', subject: 'my subject', recipients: 'djkindread@gmail.com', body: 'heres the body of the email'};
// axios.post('/api/surveys', survey);

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// the root of our app is in public/index.html
// and the id of the div that will contain whatever we create is root
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
