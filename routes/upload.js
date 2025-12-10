const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');
const fs = require('fs');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/profile_picture', upload.single('picture'), (req, res) => {
  // intentionally does not validate file type or size
  res.json({ ok: true, path: '/uploads/' + req.file.filename });
});

module.exports = router;
