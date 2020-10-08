const bcrypt = require('bcrypt');

const john = bcrypt.hashSync("johnpassword", 10);
const jane = bcrypt.hashSync("janepassword", 10);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return db.raw('TRUNCATE "user_table" RESTART IDENTITY CASCADE')
    .then(function () {
      // Inserts seed entries
      return knex('user_table').insert([
        {first_name: 'John', last_name: 'Doe', email: 'john@tester.com', password: john},
        {first_name: 'Jane', last_name: 'Doe', email: 'jane@tester.com', password: jane},
      ]);
    });
};
