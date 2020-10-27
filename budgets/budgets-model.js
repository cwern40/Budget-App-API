const db = require('../database/db-config');
const Expense = require('../expenses/expenses-model.js');
const Income = require('../income/income-model');

module.exports = {
    findBudgetById,
    addBudget,
    findBudgetIncomes,
    findBudgetExpenses,
    addIncome,
    addExpense,
    updateBudget,
    deleteBudget
}

function findBudgetById(id) {
    return db('budget_table').where({ id }).first()
}

function addBudget(data) {
    return db('budget_table').insert(data).returning('id')
        .then(newBudget => {
            return findBudgetById(newBudget[0])
        })
}

function findBudgetIncomes(budget_id) {
    return db('income_table as i')
        .join('budget_table as b', 'b.id', 'i.budget_id')
        .select('i.id', 'i.income_name', 'i.income_amount')
        .where({ budget_id })
}

function findBudgetExpenses(budget_id) {
    return db('expenses_table as e')
    .join('budget_table as b', 'b.id', 'e.budget_id')
    .select('e.id', 'e.expense_name', 'e.expense_amount')
    .where({ budget_id })
}

function addIncome(data) {
    return db('income_table').insert(data).returning('id')
        .then(newIncome => {
            return Income.findIncomeById(newIncome[0]);
        })
}

function addExpense(data) {
    return db('expenses_table').insert(data).returning('id')
        .then(newExpense => {
            return Expense.findExpenseById(newExpense[0])
        })
}

function updateBudget(id, changes) {
    return db('budget_table').where({ id }).update(changes)
        .then(update => {
            return findBudgetById(id);
        })
}

function deleteBudget(id) {
    return db('budget_table').where({ id }).del();
}