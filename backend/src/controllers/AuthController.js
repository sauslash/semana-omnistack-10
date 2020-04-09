const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');
const jwt = require('jsonwebtoken');

module.exports = {

    async index(request, response) {
		const { email, password } = request.body;

		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return response.status(400).json({ error: 'User not found.' });
		}

		if(! await bcrypt.compare(password, user.password))
			return response.status(400).json({ error: 'Invalid password.' });

		user.password = undefined;

		const token = jwt.sign( { id: user.id }, authConfig.secret, {
			expiresIn: authConfig.expiresIn
		});

        return response.send({ user, token });
	},

	async store(request, response) {
		const { email } = request.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return response.status(401).json({ error: 'User already exists.' });
		}

		const user = await User.create(request.body);
		user.password = undefined;
		return response.send({ user });

		//user.password_hash = await bcrypt.hash(user.password, 8);
		
		// return response.json({
		// 	user: {
		// 		id,
		// 		name,
		// 	},
		// 	token: jwt.sign({ id }, authConfig.secret, {
		// 		expiresIn: authConfig.expiresIn,
		// 	}),
		// });
	}
}
