import express from 'express';
import pool from '../db/pool.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

const router = express.Router();

const newUserSchema = Joi.object({
  firstName: Joi.string().alphanum().max(50).required(),

  lastName: Joi.string().alphanum().max(50).required(),

  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(
    new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,20}$',
    ),
  ),

  repeatPassword: Joi.ref('password'),

  email: Joi.string().email({
    minDomainSegments: 2,
  }),
});

router.post('/register', async (req, res, next) => {
  const { firstName, lastName, username, password, email } = req.body;
  try {
    const { error } = newUserSchema.validate(req.body);

    // console.log(error);
    if (error) {
      error.statusCode = 422;
      throw error;
    }

    const hash = await bcrypt.hash(password, 10);

    const [results] = await pool.execute(
      'INSERT INTO users (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, username, hash, email],
    );

    if (results.affectedRows === 0) {
      const error = new Error('User could not be created');
      throw error
    }

    console.log(results);
    const createdUser = { ...req.body, id: results.insertId };
    delete createdUser.repeatPassword;
    console.log('createdUser -->', createdUser);
    res.status(201)
      // .location(`/users/${createdUser.id}`)
      .send(createdUser);
  } catch (err) {
    console.log('in catch --->', err);
    if (err.code === 'ER_DUP_ENTRY') {
      err.message = err.sqlMessage.includes('email') ? 'Email already exists' : 'Username already exists';
      err.statusCode = 409;
    }
    return next(err);
  }
});

export default router;
