const db = require('../database/db-config');

module.exports = {
    findBudgetsByUser,
    findBudgetById,
    addBudget,
    findBudgetIncomes,
    findBudgetExpenses,
    addIncome,
    findIncomeById,
    addExpense,
    findExpenseById
}

function findBudgetsByUser(user_id) {
    return db('budget_member_table as t')
        .join('budget_table as b', 'b.id', 't.budget_id')
        .join('user_table as u', 'u.id', 't.user_id')
        .select('b.id', 'b.name')
        .where({ user_id })
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