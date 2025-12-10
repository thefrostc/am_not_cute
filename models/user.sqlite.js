const sqlite = require('../config/sqlite');
const db = sqlite.getDB();

module.exports = {
  create: async (user) => {
    return await db('users').insert(user);
  },
  findByUsername: async (username) => {
    return await db('users').where({ username }).first();
  },
  findById: async (id) => {
    return await db('users').where({ id }).first();
  },
  all: async () => await db('users').select('*'),
  update: async (id, data) => await db('users').where({ id }).update(data),
  delete: async (id) => await db('users').where({ id }).del()
}
