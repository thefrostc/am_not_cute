const { buildSchema } = require('graphql');
const resolvers = require('./resolvers');

module.exports = buildSchema(`
  type User { _id: ID, username: String, email: String, role: String, bio: String, age: Int, gender: String, location: String }
  type Query {
    userByUsername(username: String): User
    allUsers: [User]
  }
  type Mutation {
    updateBio(username: String, bio: String): User
  }
`);
