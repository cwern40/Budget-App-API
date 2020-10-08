const db = require('../database/db-config');

module.exports = {
    findBudgetById,
    addBudget,
    findBudgetIncomes,
    findBudgetExpenses,
    addIncome,
    findIncomeById,
    addExpense,
    findExpenseById
}

function findBudgetById(id) {
    return db('budget_table').where({ id }).first()
}

function addBudget(data) {
    return db('budget_table').insert(data)
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

function findIncomeById(id) {
    return db('income_table').where({ id }).first()
}

function addIncome(data) {
    return db('income_table').insert(data)
        .then(newIncome => {
            return findIncomeById(newIncome[0])
        })
}

function findExpenseById(id) {
    return db('expenses_table').where({ id }).first()
}

function addExpense(data) {
    return db('expenses_table').insert(data)
        .then(newExpense => {
            return findExpenseById(newExpense[0])
        })
}