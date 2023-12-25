const router = require("express").Router();

const {
    createStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    getAllStudentsAndDataInformation
} = require("../controllers/students.controller");
router.get("/studentsData", getAllStudentsAndDataInformation);
router.get("/", getAllStudents);
router.get("/:id", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);


module.exports = router;