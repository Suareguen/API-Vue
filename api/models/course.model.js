const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  labs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lab'
  }]
});

const courseModel = mongoose.model('course', courseSchema);

module.exports = courseModel
