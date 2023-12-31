const router = require("express").Router()

const studentRouter = require("./student.router")
const courseRouter = require('./course.router') 
const labRouter = require('./lab.router')
const githubRouter = require('./github.router')
const openaiRouter = require('./openai.router')
const express = require('express')


router.post('/webhook',express.json({type: 'application/json'}), (req, res) => {
    console.log('Webhook recibido:', req.body)
    // Captura la carga útil del webhook
    // Asegúrate de que es un evento de pull request
    const githubEvent = req.headers['x-github-event'];
    console.log(githubEvent)
    if (githubEvent === 'issues') {
      const data = req.body;
      const action = data.action;
      if (action === 'opened') {
        console.log(`An issue was opened with this title: ${data.issue.title}`);
      } else if (action === 'closed') {
        console.log(`An issue was closed by ${data.issue.user.login}`);
      } else {
        console.log(`Unhandled action for the issue event: ${action}`);
      }
    } else if (githubEvent === 'ping') {
      console.log('GitHub sent the ping event');
    } else {
      console.log(`Unhandled event: ${githubEvent}`);
    }
    res.status(200).send('Evento de Webhook recibido')
  })
router.use("/students", studentRouter)
router.use("/courses", courseRouter)
router.use("/labs", labRouter)
router.use("/github", githubRouter)
router.use("/openAI", openaiRouter)




module.exports = router