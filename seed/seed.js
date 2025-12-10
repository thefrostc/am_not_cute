require('dotenv').config();
const mongooseCfg = require('../config/mongoose');
const sqliteCfg = require('../config/sqlite');
const User = require('../models/User.mongo');
const sqliteUser = require('../models/user.sqlite');
const bcrypt = require('bcrypt');

(async () => {
  mongooseCfg.connect();
  sqliteCfg.init();
  await new Promise(r => setTimeout(r, 1500));

  const saltRounds = parseInt(process.env.SALT_ROUNDS || '4');
  const adminHash = await bcrypt.hash('adminpass', saltRounds);
  const userHash = await bcrypt.hash('password123', saltRounds);

  await User.deleteMany({});
  await User.create([
    { username: 'admin', password_hash: adminHash, email: 'admin@example.com', role: 'admin', bio: 'the boss', age:30 },
    { username: 'alice', password_hash: userHash, email: 'alice@example.com', role: 'user', age:22 },
    { username: 'bob', password_hash: userHash, email: 'bob@example.com', role: 'user', age:25 }
  ]);

  await sqliteUser.create({ username: 'admin', password_hash: adminHash, email: 'admin@example.com', role: 'admin', age:30 });
  await sqliteUser.create({ username: 'alice', password_hash: userHash, email: 'alice@example.com', role: 'user', age:22 });
  await sqliteUser.create({ username: 'bob', password_hash: userHash, email: 'bob@example.com', role: 'user', age:25 });

  console.log('seeded');
  process.exit(0);
})();
