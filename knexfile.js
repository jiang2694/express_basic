// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
      client: 'pg',
      connection: {
        database: 'todo_review',
        username: 'nimbus-user',
        password: '123'
      },
      migrations: {
        tableName: 'migrations',
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    }
};
