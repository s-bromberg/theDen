import express from 'express';
import pool from '../db/pool.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const sql = `
    SELECT concat_ws(' ', u.first_name,  u.last_name) AS name, p.title, p.body, p.created_at, c.category_name
    FROM posts p
    JOIN users u 
    ON u.id = p.user_id
    JOIN categories c 
    ON c.id = p.category_id
    order by p.created_at DESC
    limit ?, ?`;

  try {
    const [results] = await pool.execute(sql, [
      req.query.offset,
      req.query.limit,
    ]);

    res.send(results);
  } catch (err) {
    next(err);
  }
});

router
  .route('/:userId')
  .get(async (req, res, next) => {
    const sql = `
    SELECT concat_ws(' ', u.first_name,  u.last_name) AS name, p.title, p.body, p.created_at, c.category_name
    FROM posts p
    JOIN users u 
    ON u.id = p.user_id
    JOIN categories c 
    ON c.id = p.category_id
    WHERE p.user_id = ?
    order by p.created_at DESC
    limit ?, ?`;

    try {
      const [results] = await pool.execute(sql, [
        req.params.userId,
        req.query.offset,
        req.query.limit,
      ]);

      console.log('results -->', results);

      res.send(results);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    const { title, body, category } = req.body;
    const sql = `
      INSERT INTO posts (user_id, title, body, category_id)
      VALUES(?, ?, ?, (
        SELECT categories.id
        FROM categories
        WHERE category_name = ?
      ))`
    try {
      const results = await pool.execute(sql, [req.params.userId, title, body, category])
      console.log(results)
      res/*.location(...)*/
        .send({ id: results.insertId, ...req.body, });

    } catch (err) {
      console.log(err)
      next(err);
    }
  });

export default router;
