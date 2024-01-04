const Student = require('../models/students.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {
        // Buscar al estudiante por email con Mongoose
        const member = await Student.findOne({ email: req.body.email })

        if (!member) {
            return res.status(400).send('Error: Wrong Email or Password'); // 400 es más apropiado para errores de autenticación
        }

        // Comparar las contraseñas
       /*  const compare = bcrypt.compareSync(req.body.password, member.password) */
        /* if (compare) { */
            // Crear el token
          /*   const token = jwt.sign({ email: member.email }, 'secret', { expiresIn: '7h' }); */
            return res.status(200).json({ message: 'Member logged.' })
        /* } */
        /* return res.status(400).json({ message: 'Error: Wrong Email or Password' }) */
    } catch (err) {
        // Manejar errores inesperados
        return res.status(500).json(err.message);
    }
}

module.exports = {
    login
}