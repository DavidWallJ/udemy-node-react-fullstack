// this entire app can be run from 'thisproject/server' using 'npm run dev'
// create-react-app requires there to be a root index.js file
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

import App from './components/App';

const store = createStore(reducers, {}, applyMiddleware());
// the root of our app is in public/index.html
// and the id of the div that will contain whatever we create is root
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
