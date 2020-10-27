const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authorization = require('../users/authenticate');
const userRouter = require('../users/users-router');
const budgetrouter = require('../budgets/budgets-router');
const incomeRouter = require('../income/income-router');
const expensesRouter = require('../expenses/expenses-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/budgets', budgetrouter);
server.use('/api/income', incomeRouter);
server.use('/api/expenses', expensesRouter);

server.get('/', (req, res) => {
    res.send("It must be working!!");
})

module.exports = server;