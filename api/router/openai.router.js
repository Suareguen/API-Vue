const router = require("express").Router()

const {
    getCorrection,
} = require('../controllers/openAI.controller')

router.post("/correct", getCorrection)


module.exports = router;