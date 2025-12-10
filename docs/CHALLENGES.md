# Challenges (levels: easy, medium, pro)

## Easy
- Find the weak bcrypt salt rounds and crack a sample password (check seed/seed.js).
- Login as admin by using seeded credentials (admin:adminpass).
- Stored XSS via updating bio (GraphQL updateBio mutation is unauthenticated).
- Token theft: token stored in cookie without httpOnly by default.

## Medium
- NoSQL injection possibilities by sending crafted payloads to Mongo queries.
- SQLite SQL injection on endpoints that use raw queries (add such challenge points easily).
- IDOR: access or modify other users via naive PUT/DELETE endpoints.
- WebSocket message injection: public-message channel broadcasts unsanitized content.

## Pro
- JWT alg none / token tampering if naive verification used.
- Prototype pollution via naive merges in admin routes if modified.
- Cross-protocol attacks between SQLite and MongoDB.
- File upload abuse: arbitrary file uploads in public/uploads without checking.

---
This project intentionally contains vulnerabilities for educational testing. Do not expose it to public networks.
