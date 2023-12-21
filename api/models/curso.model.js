const { DataTypes} = require("sequelize");
const { connection } = require("../../database/index");


  const Curso = connection.define('curso', {
    // Atributos
    nombreCurso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    }
  });
  
  module.exports = Curso
  

  