const { DataTypes} = require("sequelize");
const { connection } = require("../../database/index");

const Alumno = connection.define('alumno', {
    // Atributos
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userNameGitHub: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });


  module.exports = Alumno