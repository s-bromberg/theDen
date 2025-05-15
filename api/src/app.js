import express from 'express';
import http from 'http';
import path from 'path';
const __dirname = import.meta.dirname;
import { Server } from 'socket.io';
import 'dotenv/config';
import cors from 'cors';
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js';
import commentsRouter from './routes/comments.js';
import userRouter from './routes/users.js';
import session from 'express-session';
import mysqlSession from 'express-mysql-session';
import pool from './db/pool.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: 'http://localhost:5173',
});

const MySQLStore = mysqlSession(session);
const sessionStore = new MySQLStore({}, pool);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', userRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.log('----> in error middleware', err);
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

console.log('listening on port ' + process.env.PORT || 3000);

server.listen(process.env.PORT || 3000);
