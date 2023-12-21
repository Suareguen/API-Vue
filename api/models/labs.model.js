const { DataTypes }  = require("sequelize");
const { connection } = require("../../database/index");


const Lab = connection.define('lab', {
    // Atributos
    nombreLab: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('Corregido', 'No corregido'),
      defaultValue: 'No corregido'
    }
  });

  module.exports = Lab