// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:     'localhost',
      port:     5432,
      user:     process.env.DB_USERNAME,
      database: 'Budget-App',
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
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
