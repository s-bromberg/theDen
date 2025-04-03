import express from 'express';
import pool from '../db/pool.js';

const router = express.Router();

/*router.get('/', async (req, res, next) => {
  const { firstName = '', lastName = '' } = req.query;
  try {
    const [users] = await pool.execute(
      `
      SELECT id, first_name, last_name
      FROM users
      WHERE first_name LIKE ? OR last_name LIKE ?
      `,
      [`%${firstName}%`, `%${lastName}%`],
    );

    res.send(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
});*/

router.get('/:userId', async (req, res, next) => {
  try {
    const [user] = await pool.execute(
      `
      SELECT first_name, last_name
      FROM users
      WHERE id = ?`,
      [req.params.userId],
    );

    if (!user.length) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    res.send(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
