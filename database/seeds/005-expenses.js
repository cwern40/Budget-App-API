const db = require('../db-config');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return db.raw('TRUNCATE "expenses_table" RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('expenses_table').insert([
        {expense_name: 'Mortgage', expense_amount: 950, budget_id: 1},
        {expense_name: 'Groceries', expense_amount: 450, budget_id: 1},
        {expense_name: 'Car Payment', expense_amount: 400, budget_id: 1},
        {expense_name: 'Rent', expense_amount: 400, budget_id: 2},
        {expense_name: 'Groceries', expense_amount: 200, budget_id: 2},
        {expense_name: 'Car Payment', expense_amount: 150, budget_id: 2}
      ]);
    });
};
