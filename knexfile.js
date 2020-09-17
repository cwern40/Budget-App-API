// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      directory: './database/migrations'
    }
  },

  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DB_URL,
    migrations: {
      directory: './database/migrations'
    }
  }

};
