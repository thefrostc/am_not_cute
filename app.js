const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require("mongoose")
const sqliteCfg = require('./config/sqlite');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const searchRoutes = require('./routes/search');
const uploadRoutes = require('./routes/upload');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { createServer } = require('http');
const socketInit = require('./ws/socket');


const app = express();
const httpServer = createServer(app);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET || 'sess', resave: false, saveUninitialized: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI).then(() => { console.log("Mongodb connected")})
sqliteCfg.init();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.get('/health', (req, res) => res.json({ ok: true }));

socketInit(httpServer);

const PORT = process.env.PORT || 3030;
httpServer.listen(PORT, () => console.log(`am-not-cute running on http://localhost:${PORT}`));
