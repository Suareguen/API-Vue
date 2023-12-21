const express = require('express')
const cors = require('cors')
const morgan = require('morgan')





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




const startAPI = () => {
    try {
        initializeApp()
    } catch (error) {
        throw new Error(error)
    }
}

startAPI()