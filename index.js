const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")

const mongooseStart = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/",
      {
        dbName: process.env.MONGO_DB || "test",
      }
    )
    console.log("Connected to DB")
  } catch (err) {
    console.log(`Error connecting to DB: ${err}`)
  }
}

const initializeApp = () => {
  const app = express()
    .use(express.json())
    .use(cors())
    .use(morgan("dev"))
    .use('/api', require('./api/router/index'))
    .listen(3000, () => {
      try {
        console.info("\n\n" + ">".repeat(40))
        console.info(`💻  Reboot Server Live`)
        console.info(`📡  PORT: http://localhost:3000`)
        console.info(">".repeat(40) + "\n\n")
      } catch (error) {
        throw new Error(error)
      }
    })
}

const startAPI = async () => {
  try {
    await mongooseStart();
    initializeApp();
  } catch (error) {
    throw new Error(error)
  }
}

startAPI()
