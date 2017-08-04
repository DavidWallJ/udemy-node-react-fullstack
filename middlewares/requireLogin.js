// this is our own homemade middlware
// next is required to tell middleware to move on to the next middleware or the next part of the chain
// we could app.use this in our index.js if we wanted it on all routes but we don't
// instead we're using in billingRoutes.js
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}

	next();
};
