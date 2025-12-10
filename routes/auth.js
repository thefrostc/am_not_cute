const express = require('express');
const router = express.Router();
const User = require('../models/User.mongo');
const sqliteUser = require('../models/user.sqlite');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, age, gender, location, is_cute, agry_level, bio, interests } = req.body;
    const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 4;
    const hash = await bcrypt.hash(password, saltRounds);

    const mUser = new User({
      username,
      password_hash: hash,
      email,
      age,
      gender,
      location,
      is_cute: is_cute === 'true' || is_cute === true,
      agry_level: agry_level ? parseInt(agry_level) : 0,
      bio,
      interests: interests ? (Array.isArray(interests) ? interests : interests.split(',')) : []
    });
    await mUser.save();

    await sqliteUser.create({
      username,
      password_hash: hash,
      email,
      age: age ? parseInt(age) : null,
      gender,
      location,
      is_cute: is_cute === 'true' || is_cute === true,
      agry_level: agry_level ? parseInt(agry_level) : 0,
      bio,
      interests: interests ? (Array.isArray(interests) ? interests.join(',') : interests) : '',
      role: 'user'
    });

    res.json({ ok: true, username: mUser.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user) return res.status(401).json({ error: 'invalid' });
    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ error: 'invalid' });

    const token = jwt.sign({ sub: user._id, username: user.username, role: user.role, email: user.email }, process.env.JWT_SECRET || 'supersecret_jwt_key', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: false }); // intentionally insecure by default
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});

module.exports = router;
