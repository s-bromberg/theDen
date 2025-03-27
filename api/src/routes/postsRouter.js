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
    return next(err);
  }
});


export default router;
