// three possible states here; null, payload, or false
export default (state = null, action) => {
	// console.log(action);
	switch (action.type) {
		case 'fetchUser':
			// this works because an empty string '' is a falsey
			return action.payload || false;
		default:
			return state;
	}
};
