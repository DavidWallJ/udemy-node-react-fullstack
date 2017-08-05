// this is our own homemade middlware
// next is required to tell middleware to move on to the next middleware or the next part of the chain

module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res.status(403).send({ error: 'You have no credits.' });
	}

	next();
};
