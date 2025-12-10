const express = require('express');
const router = express.Router();
const User = require('../models/User.mongo');
const sqliteUser = require('../models/user.sqlite');
const jwt = require('jsonwebtoken');

function auth(req, res, next){
  const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.cookies.token;
  if (!token) return res.status(401).json({ error: 'no token' });
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'supersecret_jwt_key');
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id }).lean();
    if (!user) return res.status(404).json({});
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  const mongo = await User.find().lean();
  const sqlite = await sqliteUser.all();
  res.json({ mongo, sqlite });
});

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    await User.deleteOne({ _id: id });
    // attempt to delete from sqlite by id may not match Mongo id - naive
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updated = await User.findByIdAndUpdate(id, data, { new: true }).lean();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
