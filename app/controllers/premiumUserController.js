const Course = require("../models/Course");

function premiumUserController() {
  return {
    async fetchCourses(req, res) {
      try {
        let courses = await Course.find({}).exec();
        return res.status(200).json({ data: courses, error: false });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ data: [], error: error });
      }
    },
  };
}

module.exports = premiumUserController;
