const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const userRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/user', userRouter);

server.get('/', (req, res) => {
    res.send("It must be working!!");
})

module.exports = server;