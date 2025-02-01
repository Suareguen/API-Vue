const { Octokit } = require("@octokit/rest")
const Student = require("../../models/students.model")
const Lab = require("../../models/labs.model")
require("dotenv").config()
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const updatePullRequests = async (body) => {
    try {
      console.log(body)
        const org = body.repository.owner.login
        const repo = body.repository.name
        const sender = body.sender.login
        // Tener cuidado aquí le paso el LAB directamente por motivos de prueba, lo suyo sería
        // usar la variable org.
        const lab = await Lab.findOne({ title: 'LAB-106-js-arrays' }).populate({
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
          /* console.log(studentInLAb) */
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
              console.log('Added to lab')
            return 'Student added to lab'
          }
          else {
            console.log('Student in lab')
            return 'Student in lab'
          }
          // Here we get the users that are not in the lab model
    } catch (error) {
        throw new Error(error)
    }    
  }

module.exports = updatePullRequests