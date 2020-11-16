const db = require('../db-config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return db.raw('TRUNCATE "budget_member_table" RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('budget_member_table').insert([
        {user_id: 1, budget_id: 1},
        {user_id: 2, budget_id: 2}
      ]);
    });
};
