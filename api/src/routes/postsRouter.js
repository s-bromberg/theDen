import express from 'express';
import pool from '../db/pool.js';
import sessionOnly from '../validation/sessionOnly.js';
import validate, { postSchema } from '../validation/dataValidation.js';

const router = express.Router();

router.route('/')
  .get(async (req, res, next) => {
    const { offset, limit, user } = req.query;

    const sql = `
    SELECT p.id, p.user_id, concat_ws(' ', u.first_name,  u.last_name) AS author, p.title, p.body, p.created_at, c.category_name
    FROM posts p
    JOIN users u 
    ON u.id = p.user_id
    JOIN categories c 
    ON c.id = p.category_id
    ${user ? 'WHERE p.user_id = ?' : ''}
    ORDER BY p.created_at DESC
    LIMIT ?, ?`;

    const bindParams = [offset || '0', limit || '100'];

    if (user) {
      bindParams.unshift(user)
    }

    try {
      const [results] = await pool.execute(sql, bindParams);

      res.send(results);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(sessionOnly, validate(postSchema), async (req, res, next) => {
    const sql = `
      INSERT INTO posts (user_id, title, body, category_id)
      VALUES(?, ?, ?, (
        SELECT categories.id
        FROM categories
        WHERE category_name = ?
      ))`

    const { title, body, category } = req.body;
    const { user } = req.session;

    console.log('in post sessionUserId -->', req.session.user.id)

    try {
      const [results] = await pool.execute(sql, [user.id, title, body, category])
      console.log(results)
      res.status(201)
        /*.location(...)*/
        .send({ id: results.insertId, ...req.body, user: user.username });
    } catch (err) {
      console.log(err)
      next(err);
    }
  });

router.get('/:postId', async (req, res, next) => {
  // const { offset, limit, user } = req.query;

  const sql = `
    SELECT p.id, concat_ws(' ', u.first_name,  u.last_name) AS author, p.title, p.body, p.created_at, c.category_name
    FROM posts p
    JOIN users u 
    ON u.id = p.user_id
    JOIN categories c 
    ON c.id = p.category_id
    WHERE p.id = ?`

  try {
    const [results] = await pool.execute(sql, [req.params.postId]);
    console.log('results -->', results);

    res.send(results);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;