const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const addRelationsToModels = require('./database/relations')
const { checkConnetion, syncModels } = require('./database/index')
const initilizeMyQLandModels = async () => {
    try {
        await checkConnetion()
        await syncModels()
        addRelationsToModels()
    } catch (error) {
        throw new Error(error)
    }
}



const initializeApp = () => {
    const app = express()
            .use(express.json())
            .use(cors())
            .use(morgan('dev'))
            .listen(3000, () => {
                try {
                    console.log('Server started at http://localhost:3000')
                } catch (error) {
                    throw new Error(error)                    
                }
            })   
}




const startAPI = async () => {
    try {
        await initilizeMyQLandModels()
        initializeApp()
    } catch (error) {
        throw new Error(error)
    }
}

startAPI()