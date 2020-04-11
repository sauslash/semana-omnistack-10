const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../../websocket');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async getDevByGitHubUserName(request, response) {

        const { github_username } = request.params;
		const dev = await Dev.findOne({ github_username });	

		if (!dev) {
			return response.status(400).json({ error: 'User not found.' });
		}

        return response.send({ dev });

    },
    
    async store(request, response) {

        const { github_username, techs, latitude, longitude, userId } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            //desestruturacao e no caso do name, caso seja null jogo o login
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            //monto objeto de localizacao para armazenar no mongo
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            //gravo o dev
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
                userId
            });

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);

            return response.json(dev);
        }
        else
            return response.json("");
        
    },

    async update(request, response) {
        
        const { userId } = request.params;
        const { name, techs } = request.body;

		let dev = await Dev.findOne({ userId });		

		if (!dev) {
			return response.status(400).json({ error: 'Dev not found.' });
        }
        
        const techsArray = parseStringAsArray(techs);

		const filter = { userId: userId };
        const update = { name, techs: techsArray };        
        await Dev.findOneAndUpdate(filter, update);
        
        return response.status(204).send();
    },
};