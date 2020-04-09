const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authConfig = require('../../config/auth');
const mailer = require('../../lib/mail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {

	async index(request, response) {
		const { email, password } = request.body;

		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return response.status(400).json({ error: 'User not found.' });
		}

		if (! await bcrypt.compare(password, user.password))
			return response.status(400).json({ error: 'Invalid password.' });

		user.password = undefined;

		return response.json({
			user: {
				id: user.id,
				name: user.name,
			},
			token: jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});

	},

	async store(request, response) {
		const { email } = request.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return response.status(401).json({ error: 'User already exists.' });
		}

		const user = await User.create(request.body);
		user.password = undefined;

		const token = crypto.randomBytes(20).toString('hex');

		mailer.sendMail({
			to: email,
			subject: "Ativação de sua conta",
			template: 'active',
			context: { token }
		}, (err) => {
			
			if(err)
				return response.status(400).json({ error: 'Cannot send email.' });
			
			return response.send({ user });

		});		

	},

}
