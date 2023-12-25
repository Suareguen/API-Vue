const mongoose = require('mongoose');


const labSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  submittedBy: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
      status: {
        type: String,
        enum: ["Corrected", "Not Corrected"],
        default: "Not Corrected",
      }
    },
  ],
});

const labModel = mongoose.model("lab", labSchema);

module.exports = labModel


