const { Octokit } = require("@octokit/rest");
const Lab = require("../models/labs.model");
const OpenAI = require("openai");
require("dotenv").config();
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const openai = new OpenAI({
  apiKey: "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",
});

async function fetchPullRequests(req, res) {
  const org = "rebootacademy-labs";
  const repo = "LAB-101-linux-intro";
  try {
    const pulls = await octokit.pulls.list({
      owner: org,
      repo: repo,
      state: "open",
    });
    const forks = await octokit.repos.listForks({
      owner: org,
      repo: repo,
    });
    const userNamesFork = forks.data.map((fork) => fork.owner.login);
    const pullsUserNames = pulls.data.map((pr) => pr.user.login);
    return res.status(200).json({ pullsUserNames, userNamesFork });
  } catch (error) {
    console.error("Error fetching pull requests:", error);
  }
}

async function fetchPullRequestFiles(req, res) {
  const org = "rebootacademy-labs";
  const repo = "LAB-103-js-introduction";
  try {
    // Fetch pull requests from the specified repository
    const pullRequests = await octokit.pulls.list({
      owner: org,
      repo: repo,
    });
    // Map through each pull request to fetch its files
    const pullRequestFiles = await Promise.all(
      pullRequests.data.map(async (pr) => {
        const files = await octokit.pulls.listFiles({
          owner: org,
          repo: repo,
          pull_number: pr.number,
        });
        // Construct an object for each pull request containing the PR details and files
        return {
          number: pr.number,
          title: pr.title,
          files: files.data.map((file) => ({
            filename: file.filename,
            status: file.status, // added, modified, removed
            additions: file.additions,
            deletions: file.deletions,
            // ... other file details you need
          })),
        };
      })
    );
    // Return the detailed pull request information along with files as a response
    res.status(200).json(pullRequestFiles);
  } catch (error) {
    console.error("Error fetching pull request files:", error);
    res.status(500).json({ error: error.message });
  }
}

async function fetchPullRequestFilesWithContent(req, res) {
  const org = "rebootacademy-labs";
  const repo = "LAB-103-js-introduction";
  try {
    // Fetch pull requests from the specified repository
    const pullRequests = await octokit.pulls.list({
      owner: org,
      repo: repo,
    });
    // Map through each pull request to fetch its files and their content
    const pullRequestFilesDetails = await Promise.all(
      pullRequests.data.map(async (pr) => {
        const filesResponse = await octokit.pulls.listFiles({
          owner: org,
          repo: repo,
          pull_number: pr.number,
        });
        // Fetch content for each file
        const filesWithContent = await Promise.all(
          filesResponse.data.map(async (file) => {
            // Use the raw_url for the file content or fetch using the blob API
            const contentResponse = await fetch(file.raw_url);
            const content = await contentResponse.text(); // Adjust if binary file
            return {
              filename: file.filename,
              status: file.status,
              additions: file.additions,
              deletions: file.deletions,
              content: content, // Content of the file
            };
          })
        );
        return {
          number: pr.number,
          title: pr.title,
          files: filesWithContent,
        };
      })
    );
    // Return the detailed pull request information along with files and their content as a response
    res.status(200).json(pullRequestFilesDetails);
  } catch (error) {
    console.error("Error fetching pull request files with content:", error);
    res.status(500).json({ error: error.message });
  }
}

async function getBlobContent(req, res) {
  const owner = "Suareguen";
  const repo = "LAB-103-js-introduction";
  const sha = "7ed676df8888715562920449aa0591498e5bf12d";
  try {
    const response = await octokit.git.getBlob({
      owner: owner,
      repo: repo,
      file_sha: sha,
    });
    const readmeInfo = await octokit.repos.getReadme({
      owner: owner,
      repo: repo,
      // Puedes especificar el path si el README tiene un nombre o ruta diferente
    });
    // Decodifica el contenido del README que está en base64
    const readmeContent = Buffer.from(
      readmeInfo.data.content,
      "base64"
    ).toString();
    const content = Buffer.from(response.data.content, "base64").toString();
    console.log(content); // Aquí está el contenido del archivo
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `La correccion que vas a realizar es de un alumno de programacion web, hazla como si fueses un profesor de programacion web, teniendo el enunciado establecido en este aqui: ${readmeContent}; quiero que me corrijas este ejercicio: ${content}; y me des una puntación media así como un comentario de mejora del ejercicio.`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });
    const correction = completion.choices[0];
    return res.status(200).json({ comment: correction.message.content });
  } catch (error) {
    console.error("Error al obtener el contenido del blob:", error);
  }
}

async function fetchRepoFileStructure(req, res) {
  const owner = "Suareguen";
  const repo = "LAB-103-js-introduction";
  try {
    // Obtén la referencia a la rama principal (p. ej., master o main)
    const branch = await octokit.repos.getBranch({
      owner: owner,
      repo: repo,
      branch: "main", // o 'master' dependiendo del repositorio
    });
    // Obtén el árbol de archivos del último commit
    const treeSha = branch.data.commit.sha;
    const tree = await octokit.git.getTree({
      owner: owner,
      repo: repo,
      tree_sha: treeSha,
      recursive: "true",
    });
    // Imprime la estructura de archivos
    console.log(tree.data.tree);
    return res.status(200).json({ tree: tree.data.tree });
  } catch (error) {
    console.error("Error fetching repository file structure:", error);
  }
}

const updatePullRequests = async (req, res) => {
  try {
    const org = req.params.org;
    const repo = req.params.repo;
    const pulls = await octokit.pulls.list({
      owner: org,
      repo: repo,
      state: "open",
    });
    const pullsUserNames = pulls.data.map((pr) => pr.user.login);
    pullsUserNames.push("juanan");
    const lab = await Lab.findOne({ title: "LAB-101-linux-intro" }).populate({
      path: "submittedBy.student", // Path to the student in the submittedBy array
      model: "student", // Explicitly specifying the model name
      populate: {
        path: "courses", // Path to courses in the student model
        model: "course", // Explicitly specifying the course model name
      },
    });
    const submittedByUsernames = lab.submittedBy.map(
      (submission) => submission.student.githubUserName
    );
    // Here we get the users that are not in the lab model
    const usersNotInLab = pullsUserNames.filter(
      (pullUserName) => !submittedByUsernames.includes(pullUserName)
    );
    console.log(usersNotInLab);

    // if (filteredSubmittedBy.length === 0) {
    //   // aqui buscar alumno en la base de datos
    //   const submittedBy = {
    //     student: "6588c4083bc68594ee061355",
    //     status: "Not Corrected",
    //   };
    //   lab.submittedBy.push(submittedBy);
    //   await lab.save();
    // }
    return res
      .status(200)
      .json({ students: pullsUserNames, lab: lab.submittedBy });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCommentAndClosePullRequest = async (req, res) => {
  try {
    const org = "rebootacademy-labs";
    const repo = "LAB-101-linux-intro";
    const response = await octokit.issues.createComment({
      owner: org,
      repo: repo,
      // Issue number is the same as the pull request number in this context
      issue_number: 2,
      body: "Good Job!!!",
    });
    const close = await octokit.pulls.update({
      owner: org,
      repo: repo,
      pull_number: 2,
      state: "closed",
    });
    return res.status(200).send("Comment created and pull request closed");
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  fetchPullRequests,
  fetchPullRequestFiles,
  fetchPullRequestFilesWithContent,
  getBlobContent,
  fetchRepoFileStructure,
  updatePullRequests,
  createCommentAndClosePullRequest,
};
