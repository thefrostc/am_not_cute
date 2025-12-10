const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  email: String,
  age: Number,
  gender: String,
  location: String,
  is_cute: { type: Boolean, default: false },
  agry_level: { type: Number, default: 0 },
  bio: String,
  interests: [String],
  role: { type: String, default: 'user' },
  created_at: { type: Date, default: Date.now }
});

UserSchema.methods.verifyPassword = function(password){
  return bcrypt.compare(password, this.password_hash);
}

module.exports = require('mongoose').model('User', UserSchema);
