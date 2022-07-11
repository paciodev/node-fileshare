const multer = require('multer');
const bcrypt = require('bcrypt');
const File = require('../models/fileModel');

exports.getUploadForm = (req, res) => {
  res.status(200).render('index');
};

const upload = multer({ dest: 'uploads' });
exports.uploadFile = upload.single('file');

exports.processFile = async (req, res) => {
  try {
    const fileData = {
      path: req.file.path,
      originalName: req.file.originalname,
    };

    if (req.body.password != null && req.body.password !== '') {
      fileData.password = await bcrypt.hash(req.body.password, 10);
    }

    const file = await File.create(fileData);

    res
      .status(200)
      .render('index', { fileLink: `${req.headers.origin}/file/${file.id}` });
  } catch (err) {
    console.error(err);
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (file.password != null) {
      if (req.body.password == null) {
        return res.render('password');
      }

      if (!(await bcrypt.compare(req.body.password, file.password))) {
        return res.render('password', { error: true });
      }
    }

    file.downloadCount++;
    await file.save();

    res.download(file.path, file.originalName);
  } catch (err) {
    console.error(err);
  }
};
