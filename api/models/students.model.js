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
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course',
    default: []
  }],
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
