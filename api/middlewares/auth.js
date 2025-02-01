const jwt = require('jsonwebtoken')
const Student = require('../models/students.model')

const checkAuth = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(404).json({ message: 'Token not found'})
    }
    jwt.verify(req.headers.authorization, 'secret', async (err, payload) => {
        if (err) {
            return res.status(401).send('Invalid token')
        }
        const student = await Student.findOne({ email: payload.email })

        res.locals.student = student
        if (!student) {
            return res.status(401).send('Invalid token')
        }
        next()
    })

}

module.exports = {
    checkAuth
}