const router = require("express").Router();

const {
    fetchPullRequests
} = require("../controllers/github.controller");

router.get("/", fetchPullRequests);
// router.get("/:id", getCourse);
// router.post("/", createCourse);
// router.put("/:id", updateCourse);
// router.delete("/:id", deleteCourse);

module.exports = router;
