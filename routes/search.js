const express = require('express');
const router = express.Router();
const sqliteUser = require('../models/user.sqlite');
const User = require('../models/User.mongo');

// example: /api/search?age=20&iscute=false
router.get('/', async (req, res) => {
  const { age, iscute } = req.query;
  try {
    // naive search on sqlite (interprets query values directly)
    const db = require('../config/sqlite').getDB();
    let q = db('users');
    if (age) q.where('age', age);
    if (iscute !== undefined) q.where('is_cute', iscute === 'true' || iscute === '1');
    const results = await q.select('*');
    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
