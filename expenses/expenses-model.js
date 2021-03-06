const db = require('../database/db-config');

module.exports = {
    findExpenseById,
    updateExpense,
    deleteExpence
}

function findExpenseById(id) {
    return db('expenses_table').where({ id }).first();
}

function updateExpense(id, changes) {
    return db('expenses_table').where({ id }).update(changes)
        .then(update => {
            return findExpenseById(id);
        })
}

function deleteExpence(id) {
    return db('expenses_table').where({ id }).del();
}