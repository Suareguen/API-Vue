const Sequelize = require("sequelize");

const connection = new Sequelize("API-Students", "root", "lampara1", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

const checkConnetion = async () => {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncModels = async () => {
  try {
    await connection.sync();
    console.log("Models synced successfully.");
  } catch (error) {
    console.error("Unable to sync models:", error);
  }
};

modules.exports = { connection, checkConnetion, syncModels };
