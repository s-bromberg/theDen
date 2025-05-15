import express from 'express';
import pool from '../db/pool.js';
import { validate, newUserSchema } from '../validation/dataValidation.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/register', validate(newUserSchema), async (req, res, next) => {
  const { firstName, lastName, username, password, email } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);

    const [results] = await pool.execute(
      'INSERT INTO users (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, username, hash, email],
    );

    if (results.affectedRows === 0) {
      throw new Error('User could not be created');
    }

    // console.log(results);

    res
      .status(201)
      // .location(`/users/${createdUser.id}`)
      .send({
        id: results.insertId,
        firstName,
        lastName,
        username,
        email,
        createdAt: new Date(),
      });
  } catch (err) {
    // console.log('in catch --->', err);
    if (err.code === 'ER_DUP_ENTRY') {
      err.message = err.sqlMessage.includes('email')
        ? 'An account with that email address already exists'
        : 'An account with that username already exists';
      err.statusCode = 409;
    }
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const [[userResult]] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );

    console.log('userResult -->', userResult);

    if (!userResult || !(await bcrypt.compare(password, userResult.password))) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    req.session.user = {
      id: userResult.id,
      username: userResult.username,
    };

    res.send(req.session.user);
  } catch (err) {
    console.log('in catch --->', err);
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(204).end();
});

export default router;
