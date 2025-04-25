import express from 'express';
import pool from '../db/pool.js';
import sessionOnly from '../validation/sessionOnly.js';
import { validate, postSchema } from '../validation/dataValidation.js';

const router = express.Router();
router.use((req, res, next) => {
  if (req.method !== 'GET') return next();

  req.sql = `
    SELECT p.id, p.author, p.title, p.body, p.created_at, c.category_name
    FROM posts p
    JOIN categories c ON c.id = p.category`;

  next();
});

router
  .route('/')
  .get(async (req, res, next) => {
    let { sql } = req;
    const { user, category, offset = '0', limit = '100' } = req.query;
    console.log(req.query);

    const bindParams = [];
    let whereClause = ' WHERE 1';

    if (user) {
      whereClause += ' AND p.author = ?'
      bindParams.push(user);
    }

    if (category) {
      whereClause += ' AND c.category_name = ?'
      bindParams.push(category);
    }

    sql += `
      ${whereClause} 
      ORDER BY p.created_at DESC
      LIMIT ?, ?`;

    bindParams.push(offset, limit);

    try {
      const [posts] = await pool.execute(sql, bindParams);

      res.send(posts);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(sessionOnly, validate(postSchema), async (req, res, next) => {
    const sql = `
      INSERT INTO posts (author, title, body, category)
      VALUES(?, ?, ?, (
        SELECT categories.id
        FROM categories
        WHERE category_name = ?
      ))`;

    const { title, body, category } = req.body;
    const { id } = req.session.user;

    console.log('in post sessionUserId -->', req.session.user.id);

    try {
      const [result] = await pool.execute(sql, [id, title, body, category]);
      console.log('result -->', result);

      res
        .status(201)
        .location(`/${result.insertId}`)
        .send({
          id: result.insertId,
          ...req.body,
          author: id,
          createdAt: new Date(),
        });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

router.get('/:postId', async (req, res, next) => {
  /*const sql = `
    SELECT p.id, p.author, p.title, p.body, p.created_at, c.category_name
    FROM posts p
    JOIN categories c 
    ON c.id = p.category
    WHERE p.id = ?`;*/

  try {
    const [post] = await pool.execute(`${req.sql} WHERE p.id = ?`, [req.params.postId]);
    console.log('results -->', post);

    res.send(post);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
