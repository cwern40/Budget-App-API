const expenses = require('./expenses-model');
const budgets = require('../budgets/budgets-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');

describe('the expenses model', () => {

    beforeEach(async () => {
        await db.raw('TRUNCATE "expenses_table" RESTART IDENTITY CASCADE;');
        await db.raw('TRUNCATE "budget_table" RESTART IDENTITY CASCADE;');
    })

    describe('The get model', () => {

        it('findExpenseById should return status code 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).get('/api/expenses/1')

            expect(res.status).toBe(200);
        })

        it('findExpenseById should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const expectedBody = { id: 1, expense_name: 'Mortgage', expense_amount: "950.00", budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).get('/api/expenses/1')

            expect(res.body).toEqual(expectedBody);
        })

        it('findExpenseById should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).get('/api/expenses/1')

            expect(res.type).toEqual('application/json');
        })

        
    })

    describe('The put model', () => {

        it('updateBudget should return status code 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const updateData = { expense_name: 'Mortgage', expense_amount: 1250, budget_id: 1 }
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).put('/api/expenses/1').set('Accept', 'application/json').send(updateData);

            expect(res.status).toBe(200);
        })

        it('updateBudget should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const updateData = { expense_name: 'Mortgage', expense_amount: 1250, budget_id: 1 };
            const expectedBody = { id: 1, expense_name: 'Mortgage', expense_amount: "1250.00", budget_id: 1 };;
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).put('/api/expenses/1').set('Accept', 'application/json').send(updateData);

            expect(res.body).toEqual(expectedBody);
        })

        it('updateBudget should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const updateData = { expense_name: 'Mortgage', expense_amount: 1250, budget_id: 1 }
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).put('/api/expenses/1').set('Accept', 'application/json').send(updateData);

            expect(res.type).toEqual('application/json');
        })
    })

    describe('The delete model', () => {

        it('deleteExpence should return a status of 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).delete('/api/expenses/1')

            expect(res.status).toBe(200);
        })

        it('deleteExpence should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const expectedBody = { removed: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).delete('/api/expenses/1')

            expect(res.body).toEqual(expectedBody);
        })

        it('deleteExpence should return a status of 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newExpense = { expense_name: 'Mortgage', expense_amount: 950, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addExpense = await budgets.addExpense(newExpense);
            const res = await request(server).delete('/api/expenses/1')

            expect(res.type).toBe('application/json');
        })
    })
})