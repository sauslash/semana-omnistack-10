require("dotenv").config();

const express = require('express');
const moongose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);
setupWebsocket(server);

moongose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

//app.use(cors({ origin: "http://localhost:3000"}));
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 3333);