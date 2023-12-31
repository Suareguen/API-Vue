const Student = require("../../models/students.model")
const Lab = require("../../models/labs.model")


const updatePullRequests = async (event, body) => {
    try {
        console.log(event)
        console.log(body)
    } catch (error) {
        throw new Error(error)
    }    
  }

module.exports = updatePullRequests