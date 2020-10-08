const db = require('../db-config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return db.raw('TRUNCATE "income_table" RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('income_table').insert([
        {income_name: 'Career', income_amount: 6000.00, budget_id: 1},
        {income_name: 'Job', income_amount: 2200.00, budget_id: 2},
      ]);
    });
};
