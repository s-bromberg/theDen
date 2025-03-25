import express from 'express';
import http from 'http';
import 'dotenv/config';
import indexRouter from './routes/indexRouter.js';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.statusCode = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

console.log('listening on port ' + process.env.PORT || 3000);

server.listen(process.env.PORT || 3000);
