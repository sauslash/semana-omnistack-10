const moongose = require('mongoose');

moongose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

moongose.Promise = global.Promise;
module.exports = moongose;