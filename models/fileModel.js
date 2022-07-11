const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, 'The file must have a path'],
  },
  originalName: {
    type: String,
    required: [true, 'The file must have a name'],
  },
  password: String,
  downloadCount: {
    type: Number,
    required: [true, 'The file must have a download count'],
    default: 0,
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
