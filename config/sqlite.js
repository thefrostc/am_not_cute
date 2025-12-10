const knex = require('knex');
const path = require('path');

let db;
module.exports = {
  init: () => {
    const file = process.env.SQLITE_FILE || path.join(__dirname, '..', 'data', 'am-not-cute.sqlite');
    db = knex({ client: 'sqlite3', connection: { filename: file }, useNullAsDefault: true });

    db.schema.hasTable('users').then(exists => {
      if (!exists) {
        return db.schema.createTable('users', table => {
          table.increments('id').primary();
          table.string('username');
          table.string('password_hash');
          table.string('email');
          table.integer('age');
          table.string('gender');
          table.string('location');
          table.boolean('is_cute');
          table.integer('agry_level');
          table.text('bio');
          table.text('interests');
          table.string('role');
          table.timestamps(true, true);
        });
      }
    }).then(() => console.log('SQLite initialized'))
      .catch(err => console.error('SQLite error', err));
  },
  getDB: () => db
};
