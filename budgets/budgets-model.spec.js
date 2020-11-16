const Budget = require('./budgets-model');
const Expenses = require('../expenses/expenses-model');
const Income = require('../income/income-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the budgets model', () => {

    beforeEach(async () => {
        await db.raw('TRUNCATE "expenses_table" RESTART IDENTITY CASCADE;');
        await db.raw('TRUNCATE "budget_table" RESTART IDENTITY CASCADE;');
        await db.raw('TRUNCATE "income_table" RESTART IDENTITY CASCADE;');
    })

    describe('The get model', () => {
        
        it('findBudgetById should return status code 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).get('/api/budgets/1')

            expect(res.status).toBe(200);
        })

        it('findBudgetById should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const expectedBody = { budget: {id: 1, budget_name: 'Personal Budget-John', savings_amount: "13500.00"}, expenses: [], income: [] };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).get('/api/budgets/1')

            expect(res.body).toEqual(expectedBody);
        })

        it('findBudgetById should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const expectedBody = { budget: {id: 1, budget_name: 'Personal Budget-John', savings_amount: "13500.00"}, expenses: [{expense_name: 'Mortgage', expense_amount: "950.00", id: 1}], income: [{income_name: 'Career', income_amount: "6000.00", id: 1}] };
            const addBudget = await Budget.addBudget(newBudget);
            const addIncome = await Budget.addIncome(newIncome);
            const addExpenses = await Budget.addExpense(newExpense);
            const res = await request(server).get('/api/budgets/1')

            expect(res.body).toEqual(expectedBody);
        })

        it('findBudgetById should return a typ of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).get('/api/budgets/1')

            expect(res.type).toEqual('application/json');
        })
    })

    describe('The add model', () => {

        it('addBudget should return a status code of 201', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const res = await request(server).post('/api/budgets').set('Accept', 'application/json').send(newBudget);

            expect(res.status).toBe(201);
        })

        it('addBudget should return a json object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const expectedBody = { id: 1, budget_name: 'Personal Budget-John', savings_amount: "13500.00"};
            const res = await request(server).post('/api/budgets').set('Accept', 'application/json').send(newBudget);

            expect(res.body).toEqual(expectedBody);
        })

        it('addBudget should return a type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const res = await request(server).post('/api/budgets').set('Accept', 'application/json').send(newBudget);

            expect(res.type).toEqual('application/json');
        })

        it('addIncome should return a status code of 201', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).post('/api/budgets/1/income').set('Accept', 'application/json').send(newIncome);

            expect(res.status).toBe(201);
        })

        it('addIncome should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const expectedBody = { id: 1, income_name: 'Career', income_amount: '6000.00', budget_id: 1 }
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).post('/api/budgets/1/income').set('Accept', 'application/json').send(newIncome);

            expect(res.body).toEqual(expectedBody);
        })

        it('addIncome should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const expectedBody = { id: 1, income_name: 'Career', income_amount: '6000.00', budget_id: 1 }
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).post('/api/budgets/1/income').set('Accept', 'application/json').send(newIncome);

            expect(res.type).toEqual('application/json');
        })

        it('addExpense should return a status code of 201', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).post('/api/budgets/1/expenses').set('Accept', 'application/json').send(newExpense);

            expect(res.status).toBe(201);
        })

        it('addExpense should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const expectedBody = { id: 1, expense_name: 'Mortgage', expense_amount: '950.00', budget_id: 1 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).post('/api/budgets/1/expenses').set('Accept', 'application/json').send(newExpense);

            expect(res.body).toEqual(expectedBody);
        })

        it('addExpense should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const expectedBody = { id: 1, expense_name: 'Mortgage', expense_amount: '950.00', budget_id: 1 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).post('/api/budgets/1/expenses').set('Accept', 'application/json').send(newExpense);

            expect(res.type).toEqual('application/json');
        })
    })

    describe('The put model', () => {

        it('updateBudget should return a status code of 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const change = { budget_name: 'Family Budget-John', savings_amount: 10200 };
            const res = await request(server).put('/api/budgets/1').set('Accept', 'application/json').send(change);

            expect(res.status).toBe(200)
        })

        it('updateBudget should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const change = { budget_name: 'Family Budget-John', savings_amount: 10200 };
            const expectedBody = { updated: {id: 1, budget_name: 'Family Budget-John', savings_amount: '10200.00'} };
            const res = await request(server).put('/api/budgets/1').set('Accept', 'application/json').send(change);

            expect(res.body).toEqual(expectedBody)
        })

        it('updateBudget should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const change = { budget_name: 'Family Budget-John', savings_amount: 10200 };
            const res = await request(server).put('/api/budgets/1').set('Accept', 'application/json').send(change);

            expect(res.type).toEqual('application/json')
        })
    })

    describe('The delete model', () => {

        it('deleteBudget should return a status code of 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).delete('/api/budgets/1');

            expect(res.status).toBe(200);
        })

        it('deleteBudget should return a status code of 200 even with expenses and incomes', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const addBudget = await Budget.addBudget(newBudget);
            const addIncome = await Budget.addIncome(newIncome);
            const addExpenses = await Budget.addExpense(newExpense);
            const res = await request(server).delete('/api/budgets/1');

            expect(res.status).toBe(200);
        })

        it('deleteBudget should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const expectedBody = { removed: 1 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).delete('/api/budgets/1');

            expect(res.body).toEqual(expectedBody);
        })

        it('deleteBudget should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const addBudget = await Budget.addBudget(newBudget);
            const res = await request(server).delete('/api/budgets/1');

            expect(res.type).toBe('application/json');
        })
    })
})