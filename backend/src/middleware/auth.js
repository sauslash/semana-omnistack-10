const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (request, response, next) => {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		return response.status(401).json({ error: 'Token not provided' });
	}

	const [, token] = authHeader.split(' ');

	try {
		const decoded = jwt.verify(token, authConfig.secret);
		request.userId = decoded.id;

		return next();
	} catch (err) {
		return response.status(401).json({ error: 'Token invalid' });
	}
};
