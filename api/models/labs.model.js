const mongoose = require('mongoose');


const labSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  submittedBy: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      status: {
        type: String,
        enum: ["Corrected", "Not Corrected"],
        default: "Not Corrected",
      },
      delivered: { 
        type: Boolean,
        default: false
      }
    },
  ],
});

const labModel = mongoose.model("lab", labSchema);

module.exports = labModel


