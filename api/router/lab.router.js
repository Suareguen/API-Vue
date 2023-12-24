const router = require("express").Router();

const {
    createLab,
    getAllLabs,
    getLab,
    updateLab,
    deleteLab
} = require("../controllers/lab.controller");

router.get("/", getAllLabs);
router.get("/:id", getLab);
router.post("/", createLab);
router.put("/:id", updateLab);
router.delete("/:id", deleteLab);


module.exports = router;