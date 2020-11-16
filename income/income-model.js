const db = require('../database/db-config');

module.exports = {
    findIncomeById,
    updateIncome,
    deleteIncome
}

function findIncomeById(id) {
    return db('income_table').where({ id }).first();
}

function updateIncome(id, changes) {
    return db('income_table').where({ id }).update(changes)
        .then(update => {
            return findIncomeById(id);
        })
}

function deleteIncome(id) {
    return db('income_table').where({ id }).del();
}