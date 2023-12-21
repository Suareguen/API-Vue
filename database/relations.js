const Alumno = require("../api/models/alumnos.model");
const Curso = require("../api/models/curso.model");
const Lab = require("../api/models/labs.model");

const addRelationsToModels = () => {
  try {
    // Relaciones
    Alumno.belongsToMany(Curso, { through: "AlumnoCurso" });
    Curso.belongsToMany(Alumno, { through: "AlumnoCurso" });

    Curso.hasMany(Lab);
    Lab.belongsTo(Curso);

    Alumno.belongsToMany(Lab, { through: "AlumnoLab" });
    Lab.belongsToMany(Alumno, { through: "AlumnoLab" });
    console.log("Sync relations and models...");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = addRelationsToModels;
