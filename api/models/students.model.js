const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  githubUserName: {
    type: String,
    required: true
  },
  // courses: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Course',
  //   default: []
  // }],
  // email: {
  //   type: String,
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     "Error: Wrong email format."
  //   ]
  // }
});

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel
