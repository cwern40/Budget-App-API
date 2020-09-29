const db = require('../database/db-config');

module.exports = {
    findById,
    findBy,
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

function add(user) {
    return db('user_table').insert(user)
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