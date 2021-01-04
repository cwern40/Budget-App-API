const db = require('../database/db-config');

module.exports = {
    findUsersByBudgetId,
    findUserBudgetById,
    addUserBudget,
    deleteUserBudget,
}

function findUsersByBudgetId(budget_id) {
    return db('budget_member_table as t')
        .join('budget_table as b', 'b.id', 't.budget_id')
        .join('user_table as u', 'u.id', 't.user_id')
        .select('u.id', 'u.first_name', 'u.last_name', 't.id as user_budget_id')
        .where({ budget_id })
}

function findUserBudgetById(id) {
    return db('budget_member_table')
        .where({ id })
        .first()
}

function addUserBudget(member_budget) {
    return db('budget_member_table').insert(member_budget).returning('id')
        .then(newUserBudget => {
            return findUserBudgetById(newUserBudget[0])
        })
}

function deleteUserBudget(id) {
    return db('budget_member_table').where({ id }).del();
}