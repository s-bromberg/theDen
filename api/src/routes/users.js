import express from 'express';
import pool from '../db/pool.js';
import multer from 'multer';
import sessionOnly from '../validation/sessionOnly.js';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

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

router.get('/user/:userId', async (req, res, next) => {
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

const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { id } = req.session.user;
    const dir = await fs.mkdir(`./public/images/avatars/${id}`, {
      recursive: true,
    });
    cb(null, dir || `./public/images/avatars/${id}`);
  },

  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split('/')[1];
    const filename = `${Date.now()}_user${req.session.user.id}_${file.fieldname}_${Math.round(Math.random() * 1e9)}.${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (
      !validMimeTypes.includes(file.mimetype) &&
      !validExtensions.includes(ext)
    ) {
      const err = new Error('Only JPEG, PNG, or WebP files are allowed');
      err.statusCode = 415;
      return cb(err);
    }

    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.put(
  '/upload-avatar',
  sessionOnly,
  upload.single('avatar'),
  async (req, res, next) => {
    const { id } = req.session.user;
    const { file } = req;

    if (!file) {
      const err = new Error('No file uploaded');
      err.statusCode = 400;
      return next(err);
    }

    const ext = path.extname(file.filename)
    const fileName = path.basename(file.filename, ext);
    console.log('fileName -->', fileName);
    const resizedPath = `${file.destination}/${fileName}_resized${ext}`
    console.log('resizedPath -->', resizedPath);
    try {
      await sharp(file.path)
        .resize({
          height: 500,
          width: 500,
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .toFile(resizedPath);

      console.log('resizedPath -->', resizedPath);
      const dbPath = resizedPath.replace('./public/', '').replaceAll('\\', '/');
      console.log('dbPath -->', dbPath);

      const [result] = await pool.execute(
        `UPDATE users
        SET profile_image = ?
        WHERE ID = ?`,
        [dbPath, id],
      );

      if (result.affectedRows === 0) {
        throw new Error('Unable to update profile picture');
      }

      deleteOldAvatar(id);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },
);

async function deleteOldAvatar(userId) {
  const dir = 'public/images/avatars/' + userId;
  const avatars = await fs.readdir(dir);

  if (avatars.length > 1) {
    avatars.sort((a, b) => Number(a.split('_')[0]) - Number(b.split('_')[0]));

    avatars.pop();
    avatars.forEach(avatar => fs.unlink(`${dir}/${avatar}`));
  }
  console.log(avatars);
}

export default router;
