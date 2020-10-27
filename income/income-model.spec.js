const income = require('./income-model');
const budgets = require('../budgets/budgets-model');
const db = require('../database/db-config');
const request = require('supertest');
const server = require('../api/server');
const { isMainThread } = require('worker_threads');

describe('the income model', () => {

    beforeEach(async () => {
        await db.raw('TRUNCATE "income_table" RESTART IDENTITY CASCADE;');
    })

    describe('the get mode', () => {

        it('findIncomeById should return status code 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).get('/api/income/1')

            expect(res.status).toBe(200);
        })

        it('findIncomeById should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const expectedBody = { id: 1, income_name: 'Career', income_amount: "6000.00", budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).get('/api/income/1')

            expect(res.body).toEqual(expectedBody);
        })

        it('findIncomeById should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).get('/api/income/1')

            expect(res.type).toEqual('application/json');
        })
    })

    describe('The put model', () => {

        it('updateIncome should return status code 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const updateData = { income_name: 'Career', income_amount: 8000.00, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).put('/api/income/1').set('Accept', 'application/json').send(updateData);

            expect(res.status).toBe(200);
        })

        it('updateIncome should return JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const updateData = { income_name: 'Career', income_amount: 8000.00, budget_id: 1 };
            const expectedBody = { id: 1, income_name: 'Career', income_amount: "8000.00", budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).put('/api/income/1').set('Accept', 'application/json').send(updateData);

            expect(res.body).toEqual(expectedBody);
        })

        it('updateIncome should return type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const updateData = { income_name: 'Career', income_amount: 8000.00, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).put('/api/income/1').set('Accept', 'application/json').send(updateData);

            expect(res.type).toEqual('application/json');
        })
    })

    describe('The delete model', () => {

        it('deleteIncome should return status code 200', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).delete('/api/income/1');

            expect(res.status).toBe(200);
        })

        it('deleteIncome should return a JSON object', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const expectedBody = { removed: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).delete('/api/income/1');

            expect(res.body).toEqual(expectedBody);
        })

        it('deleteIncome should return a type of application/json', async () => {
            const newBudget = { budget_name: 'Personal Budget-John', savings_amount: 13500 };
            const newIncome = { income_name: 'Career', income_amount: 6000.00, budget_id: 1 };
            const addBudget = await budgets.addBudget(newBudget);
            const addIncome = await budgets.addIncome(newIncome);
            const res = await request(server).delete('/api/income/1');

            expect(res.type).toEqual('application/json');
        })
    })
})