const express = require('express');
const router = express.Router();
const User = require('../models/User.mongo');
const sqliteUser = require('../models/user.sqlite');

function adminAuth(req, res, next){
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.cookies.token;
  if (!token) return res.status(401).json({ error: 'no token' });
  try {
    const data = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key');
    if (data.role !== 'admin') return res.status(403).json({ error: 'admin only' });
    next();
  } catch (err) { return res.status(401).json({ error: 'invalid token' }); }
}

router.post('/create-user', adminAuth, async (req, res) => {
  const { username, password_hash, email, role } = req.body;
  const u = new User({ username, password_hash, email, role: role || 'user' });
  await u.save();
  await sqliteUser.create({ username, password_hash, email, role: role || 'user' });
  res.json({ ok: true });
});

module.exports = router;
