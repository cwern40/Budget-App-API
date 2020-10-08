
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return db.raw('TRUNCATE "budget_table" RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('budget_table').insert([
        {budget_name: 'Personal Budget-John'},
        {budget_name: 'Personal Budget-Jane'}
      ]);
    });
};
