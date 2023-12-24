const router = require("express").Router();

const {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/students.controller");

router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);


module.exports = router;