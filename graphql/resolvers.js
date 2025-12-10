const User = require('../models/User.mongo');

module.exports = {
  userByUsername: async ({ username }) => {
    return await User.findOne({ username }).lean();
  },
  allUsers: async () => {
    return await User.find().lean();
  },
  updateBio: async ({ username, bio }) => {
    return await User.findOneAndUpdate({ username }, { $set: { bio } }, { new: true }).lean();
  }
}
