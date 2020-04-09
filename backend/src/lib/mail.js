const path = require('path');
const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

const exhbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass
    }
});

transport.use('compile', exhbs({
    viewEngine: {
        layoutsDir: path.resolve('./src/app/views/mail/auth/'),
        partialsDir: path.resolve('./src/app/views/mail/auth/'),
    },
    viewPath: path.resolve('./src/app/views/mail/auth/'),
    extName: '.html'
}));


module.exports = transport;