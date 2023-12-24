const router = require("express").Router();

const studentRouter = require("./student.router");
const courseRouter = require('./course.router'); // Define and implement this
const labRouter = require('./lab.router');
const githubRouter = require('./github.router');


router.use("/students", studentRouter);
router.use("/courses", courseRouter);
router.use("/labs", labRouter);
router.use("/github", githubRouter);



module.exports = router;