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

	async getById(request, response) {

        const { id } = request.params;
		const user = await User.findById(id);		

		if (!user) {
			return response.status(400).json({ error: 'User not found.' });
		}

        return response.send({ user });

	},

	async store(request, response) {
		const { email } = request.body;

		const userExists = await User.findOne({ email });

		if (userExists) {
			return response.status(401).json({ error: 'User already exists.' });
		}

		const tokenRegister = crypto.randomBytes(20).toString('hex');
		let user = request.body;
		user.tokenConfirmRegister = tokenRegister;

		user = await User.create(user);
		user.password = undefined;		

		const data = {
			tokenRegister,
			tokenAuth: jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			})
		}

		mailer.sendMail({
			to: email,
			subject: "Ative sua conta!",
			template: 'active',
			context: { data }
		}, (err) => {

			if (err)
				return response.status(400).json({ error: 'Cannot send email.' });

			return response.send({ user });

		});

	},

	async active(request, response) {

        const { tokenConfirmRegister } = request.params;

		const user = await User.findOne({ tokenConfirmRegister });		

		if (!user) {
			return response.status(400).json({ error: 'User not found.' });
		}

        return response.send({ user });

	},
	
	async update(request, response) {

        const { tokenConfirmRegister } = request.params;

		let user = await User.findOne({ tokenConfirmRegister });		

		if (!user) {
			return response.status(400).json({ error: 'User not found.' });
		}

		const filter = { tokenConfirmRegister: tokenConfirmRegister };
		const update = { active: 'S', confirmRegisterAt: Date.now() };

		user = await User.findOneAndUpdate(filter, update);
        return response.status(204).send();
    },

}
