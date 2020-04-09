const moongose = require('mongoose');

moongose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

moongose.Promise = global.Promise;
module.exports = moongose;