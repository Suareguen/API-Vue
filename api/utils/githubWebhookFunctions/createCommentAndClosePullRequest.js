const { Octokit } = require("@octokit/rest");
const OpenAI = require("openai");
const Student = require("../../models/students.model");
const Lab = require("../../models/labs.model");
require("dotenv").config();
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const createCommentAndClosePullRequest = async (body) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>> Create Comment And CLose Pull Request");
    console.log("Sender:", body.sender.login);
    console.log("RepoName:", body.repository.name);
    console.log("Owner:", body.repository.owner.login);
    /* const org = body.repository.owner.login; */
    const org = 'rebootacademy-labs'
    /* const repo = body.repository.name; */
    const repo = "LAB-106-js-arrays"
    const sender = body.sender.login;
    const response = await octokit.rest.pulls.list({
      owner: 'rebootacademy-labs',
      repo: repo,
      state: "open",
    })
    console.log("Pull Requests:", response)
    const userPRs = response.data.filter((pr) => pr.user.login === sender)
    if (userPRs.length === 0) {
      console.log("Pull Request Closed")
      return "pull request closed"
    }
    console.log("sha:", userPRs[0].head.sha);
    const commit = await octokit.git.getCommit({
      owner: org,
      repo: repo,
      commit_sha: userPRs[0].head.sha,
    })
    const treeSha = commit.data.tree.sha;
    const tree = await octokit.git.getTree({
      owner: org,
      repo: repo,
      tree_sha: treeSha,
    })
    const fileSha = tree.data.tree.find(
      (file) => file.path === "starter-code"
    ).sha
    const iterationsTree = await octokit.git.getTree({
      owner: org,
      repo: repo,
      tree_sha: fileSha,
    })
    const scriptFile = iterationsTree.data.tree.find(
      (f) => f.path === "index.js"
    )
    if (!scriptFile || !scriptFile.sha) {
      throw new Error("Not found index.js in starter-code")
    }
    const scriptFileSha = scriptFile.sha;
    const response3 = await octokit.git.getBlob({
      owner: org,
      repo: repo,
      file_sha: scriptFileSha,
    });
    const content = Buffer.from(response3.data.content, "base64").toString(
      "utf-8"
    );
    const readmeInfo = await octokit.repos.getReadme({
      owner: org,
      repo: repo,
    });
    const readmeContent = Buffer.from(
      readmeInfo.data.content,
      "base64"
    ).toString();
    const example = `¡Hola!
          Veo que en tu ejercicio has utilizado el método window.prompt para pedir al usuario que introduzca un valor. También has utilizado console.log para imprimir el valor introducido en la consola del navegador.
          Sin embargo, el ejercicio requería un poco más de complejidad. Te has detenido en el paso inicial y no has completado el resto del ejercicio, que incluía realizar comparaciones de cadenas y ciclos para imprimir los caracteres de los nombres de piloto y conductor.
          Te recomendaría que vuelvas a revisar el enunciado del ejercicio y trates de completar todas las partes solicitadas.
          Además, es importante prestar atención a la calidad del código y a su estructura. Intenta organizar tu código de una manera legible y entendible para que puedas seguir el flujo de tu programa más fácilmente. También es importante que incluyas comentarios explicativos para que otros desarrolladores puedan entender tu lógica.
          En cuanto a la puntuación, en este momento no puedo asignar una calificación ya que el ejercicio no ha sido completado. Una vez que realices las correcciones y completes el ejercicio, estaré encantado de asignarte una calificación. ¡Sigue practicando y no dudes en consultarme si tienes alguna duda con el ejercicio!
          `;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Toma este comentario como ejemplo: ${example}La correccion que vas a realizar es de un alumno de programacion web, hazla como si fueses un profesor de programacion web, teniendo el enunciado establecido en este aqui: ${readmeContent}; quiero que me corrijas este ejercicio: ${content}; y me des una puntación media así como un comentario de mejora del ejercicio.`,
        },
      ],
      // model: "gpt-4",
      model: "gpt-3.5-turbo-1106",
    });
    const correction = completion.choices[0]
    const response2 = await octokit.issues.createComment({
      owner: org,
      repo: repo,
      // Issue number is the same as the pull request number in this context
      issue_number: userPRs[0].number,
      body: correction.message.content,
    })
    const lab = await Lab.findOne({ title: repo }).populate(
      "submittedBy.student"
    )
    if (!lab) {
      throw new Error("Lab not found")
    }
    const student = await Student.findOne({
      githubUserName: sender,
    })
    // Paso 2: Buscar en 'submittedBy' el estudiante con el ID específico
    const studentSubmission = lab.submittedBy.filter(
      (studentSub) =>
        studentSub.student.githubUserName === student.githubUserName
    )
    console.log(studentSubmission)
    lab.submittedBy.forEach((studentSub) => {
      if (studentSub.student.githubUserName === student.githubUserName) {
        studentSub.status = "Corrected"
      }
    })
    await lab.save()
    // Close Pull Request
    // const close = await octokit.pulls.update({
    //   owner: org,
    //   repo: repo,
    //   pull_number: pullsUserNames[0].number,
    //   state: "closed",
    // })
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = createCommentAndClosePullRequest
