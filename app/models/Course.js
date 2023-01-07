const mongoose = require("mongoose");

const Courseschema = new mongoose.Schema({
  category: { type: String, required: true },
  category_header: { type: String, required: true },
  category_desc: { type: String, required: true },
  data: [
    {
      "sub-category": String,
      "file-link": String,
      "content": String,
    },
  ],
});

const Course = mongoose.model("Course", Courseschema);

module.exports = Course;
