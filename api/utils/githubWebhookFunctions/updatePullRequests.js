const { Octokit } = require("@octokit/rest")
const Student = require("../../models/students.model")
const Lab = require("../../models/labs.model")
require("dotenv").config()
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const updatePullRequests = async (event, body) => {
    try {
        console.log("Event:",event)
        console.log("Sender:",body.sender.login)
        console.log("RepoName:",body.repository.name)
        console.log("Owner:", body.repository.owner.login)
        const org = body.repository.owner.login
        const repo = body.repository.name
        const sender = body.sender.login
  
        const lab = await Lab.findOne({ title: repo }).populate({
            path: "submittedBy.student", // Path to the student in the submittedBy array
            model: "student", // Explicitly specifying the model name
            populate: {
              path: "courses", // Path to courses in the student model
              model: "course", // Explicitly specifying the course model name
            },
          })
          const submittedByUsernames = lab.submittedBy.map(
            (submission) => submission.student.githubUserName
          )
          const studentInLAb = submittedByUsernames.filter((student) => {
            return student.student.githubUserName === sender
          })
          console.log(studentInLAb)
          // Here we get the users that are not in the lab model
    } catch (error) {
        throw new Error(error)
    }    
  }

module.exports = updatePullRequests