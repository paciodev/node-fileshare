const express = require('express');
const {
  getUploadForm,
  uploadFile,
  processFile,
  getFile,
} = require('../controllers/fileController');

const router = express.Router();

router.get('/', getUploadForm);
router.post('/upload', uploadFile, processFile);

router.route('/file/:id').get(getFile).post(getFile);

module.exports = router;
