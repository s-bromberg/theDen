import express from 'express';
import pool from '../db/pool.js';
import multer from 'multer';
import sessionOnly from '../validation/sessionOnly.js';

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

const storage = multer.diskStorage({
  destination: './public/images/',
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const filename =
      `${file.fieldname}_${Date.now()}_${Math.round(Math.random() * 1E9)}.${ext}`;
    cb(null, filename);
  }
})
const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    //check for
    //   valid mimetype
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post('/:userId/upload',/* sessionOnly,*/ upload.single('uploaded_file'), (req, res, next) => {
  console.log(req.headers['content-type'], req.file)
  res.end()
});

export default router;
