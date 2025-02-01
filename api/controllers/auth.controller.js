const Student = require('../models/students.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const studentExist = await Student.findOne({ email: req.body.email })
        if (studentExist) {
            return res.status(400).send('Error: Student already exists')
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const student = new Student(req.body)
        await student.save()
        const token = jwt.sign({ email: student.email }, 'secret', { expiresIn: '7h' })
        return res.status(200).json({student, token})
    } catch (error) {
        console.error(error)
        return res.status(500).send('Error: Cannot create member')
    }
}
const login = async (req, res) => {
    try {
        // Buscar al estudiante por email con Mongoose
        const student = await Student.findOne({ email: req.body.email })
        if (!student) {
            return res.status(400).send('Error: Wrong Email or Password'); // 400 es más apropiado para errores de autenticación
        }
        // Comparar las contraseñas
        const compare = bcrypt.compareSync(req.body.password, student.password)
        if (compare) {
            // Crear el token
            const token = jwt.sign({ email: student.email }, 'secret', { expiresIn: '7h' });
            return res.status(200).json({ message: 'Student logged.', token })
        }
        return res.status(400).json({ message: 'Error: Wrong Email or Password' })
    } catch (err) {
        // Manejar errores inesperados
        return res.status(500).json(err.message);
    }
}

module.exports = {
    login,
    signUp
}