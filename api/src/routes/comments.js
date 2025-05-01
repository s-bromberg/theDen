import express from 'express';
import pool from '../db/pool.js';
import sessionOnly from '../validation/sessionOnly.js';
import { commentsSchema, validate } from '../validation/dataValidation.js';

const router = express.Router();

const addPostIdToBody = (req, res, next) => {
  req.body = { postId: req.params.postId, ...req.body }; //add postId to body for validation as the validate method only expects body
  next();
};

router
  .route('/:postId')
  .get(async (req, res, next) => {
    const sql = `
      SELECT c.id, c.post, c.author, c.title, c.body, c.created_at
      FROM comments c
      JOIN posts p 
      ON p.id = c.post
      WHERE p.id = ?
      LIMIT ?, ?`;

    const { offset = '0', limit = '100' } = req.query;

    try {
      const [comments] = await pool.execute(sql, [
        req.params.postId,
        offset,
        limit,
      ]);
      console.log(comments);

      res.send(comments);
    } catch (err) {
      console.log(err);
      next(err);
    }
  })
  .post(
    sessionOnly,
    addPostIdToBody,
    validate(commentsSchema),
    async (req, res, next) => {
      const sql = `
      INSERT INTO comments (author, post, title, body)
      VALUES(?, ?, ?, ?)`;

      const { title, body } = req.body;
      const { id } = req.session.user;
      const { postId } = req.params;

      try {
        const [result] = await pool.execute(sql, [id, postId, title, body]);
        console.log(result);

        if (!result.affectedRows) {
          throw new Error('Comment not able to be created');
        }

        res
          .status(201)
          // .location(`/${result.insertId}`)
          .send({
            id: result.insertId,
            author: id,
            ...req.body,
            createdAt: new Date(),
          });
      } catch (err) {
        console.log(err);

        if (err.errno === 1452) {
          const error = new Error('Post not found');
          error.statusCode = 404;
          return next(error);
        }
        next(err);
      }
    },
  );

export default router;
