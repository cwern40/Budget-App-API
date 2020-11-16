
exports.up = function(knex) {
  return knex.schema.table('budget_table', col => {
      col.decimal('savings_amount');
  })
};

exports.down = function(knex) {
  return knex.schema.table('budget_table', col => {
      col.dropColumn('savings_amount');
  })
};
