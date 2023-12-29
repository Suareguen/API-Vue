const router = require("express").Router();

const studentRouter = require("./student.router");
const courseRouter = require('./course.router'); // Define and implement this
const labRouter = require('./lab.router');
const githubRouter = require('./github.router');
const openaiRouter = require('./openai.router');


router.post('/webhook', (req, res) => {
    console.log('Webhook recibido:', req.body);
  
    // Captura la carga útil del webhook
    const payload = req.body;
  
    // Asegúrate de que es un evento de pull request
    if (payload.pull_request) {
      console.log(`Evento de Pull Request: ${payload.action}`);
  
      switch (payload.action) {
        case 'opened':
          console.log('Pull Request abierto:', payload.pull_request);
          // Aquí puedes hacer algo con la información del pull request abierto
          break;
        case 'closed':
          console.log('Pull Request cerrado:', payload.pull_request);
          // Manejar un pull request cerrado
          break;
        // Incluye otros casos según lo necesites
      }
    }
  
    res.status(200).send('Evento de Webhook recibido');
  });
router.use("/students", studentRouter);
router.use("/courses", courseRouter);
router.use("/labs", labRouter);
router.use("/github", githubRouter);
router.use("/openAI", openaiRouter);




module.exports = router;