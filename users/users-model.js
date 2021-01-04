const db = require('../database/db-config');

module.exports = {
    findById,
    findBy,
    findUserBudgets,
    add,
    update,
    remove
}

function findById(id) {
    return db('user_table')
        .where({ id })
        .select('id', 'first_name', 'last_name', 'email').first()
}

function findBy(filter) {
    return db('user_table').where(filter)
}

function findUserBudgets(user_id) {
    return db('budget_member_table as t')
        .join('budget_table as b', 'b.id', 't.budget_id')
        .join('user_table as u', 'u.id', 't.user_id')
        .select('b.id', 'b.budget_name', 't.id as user_budget_id')
        .where({ user_id })
}

function add(user) {
    return db('user_table').insert(user).returning('id')
        .then(newUser => {
            return findById(newUser[0])
        })
}

function update(changes, id) {
    return db('user_table').where({ id }).update(changes)
        .then(update => {
            return findById(id)
        })
}

function remove(id) {
    return db('users').where({ id }).del();
}