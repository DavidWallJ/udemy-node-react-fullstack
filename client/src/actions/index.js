import axios from 'axios';

export const fetchUser = () => async dispatch => {
	// this route works because of our proxy settings in the client side package.json
	const res = await axios.get('/api/current_user');

	dispatch({ type: 'fetchUser', payload: res.data });
};

// totally equal code...
// export const fetchUser = () => {
// 	return function(dispatch) {
// 		axios.get('/api/current_user').then(res =>
// 			dispatch({
// 				type: 'fetchUser',
// 				payload: res
// 			})
// 		);
// 	};
// };
