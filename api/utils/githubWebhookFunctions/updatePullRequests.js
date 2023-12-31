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
  
        const lab = await Lab.findOne({ title: 'LAB-103-js-introduction' }).populate({
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
            return student === sender
          })
          console.log(studentInLAb)
          if(studentInLAb.length === 0){
            let student = await Student.findOne({
                githubUserName: sender,
              })
              console.log(student)
              const submittedBy = {
                student: student._id,
                status: "Not Corrected",
              }
              lab.submittedBy.push(submittedBy)
              await lab.save()
            console.log("Student in lab")
            return 'Student in lab'
          }
          else {
            console.log("Student not in lab")
            return 'Student not in lab'
          }
          // Here we get the users that are not in the lab model
    } catch (error) {
        throw new Error(error)
    }    
  }

module.exports = updatePullRequests