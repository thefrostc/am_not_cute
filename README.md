# am-not-cute

An intentionally vulnerable Express + Mongoose + SQLite project for learning hunting and remediation.

WARNING: This project is insecure by design. Run only in isolated environments.

## Quick start

1. Copy `.env.example` to `.env` and adjust values.
2. `npm install`
3. Start a local MongoDB instance.
4. `npm run seed` to populate databases.
5. `npm start`

Open http://localhost:3000

## Features
- REST API (auth, users, admin, search, upload)
- GraphQL endpoint with vulnerable resolvers
- WebSocket chat
- MongoDB (Mongoose) + SQLite with duplicated user records
- Frontend with intentionally unsafe rendering (XSS vectors)

## Signup fields
- username
- password_hash (stored as hash)
- email
- age
- gender
- location
- is_cute
- agry_level
- bio
- interests
- created_at

## Challenges
See docs/CHALLENGES.md
