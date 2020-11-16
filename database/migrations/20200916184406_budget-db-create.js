
exports.up = function(knex) {
  return knex.schema.createTable('user_table', tbl => {
      tbl.increments();
      tbl.string('first_name').notNullable();
      tbl.string('last_name').notNullable();
      tbl.string('email').notNullable();
      tbl.string('password').notNullable();
  })

  .createTable('budget_table', tbl => {
      tbl.increments();
      tbl.string('budget_name').notNullable();
  })

  .createTable('budget_member_table', tbl => {
      tbl.increments();
      tbl.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('user_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('budget_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('budget_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })

  .createTable('income_table', tbl => {
      tbl.increments();
      tbl.string('income_name').notNullable();
      tbl.decimal('income_amount').notNullable();
      tbl.integer('budget_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('budget_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })

  .createTable('expenses_table', tbl => {
      tbl.increments();
      tbl.string('expense_name').notNullable();
      tbl.decimal('expense_amount').notNullable();
      tbl.integer('budget_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('budget_table')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_table')
    .dropTableIfExists('budget_table')
    .dropTableIfExists('budget_member_table')
    .dropTableIfExists('income_table')
    .dropTableIfExists('expenses_table')
};
