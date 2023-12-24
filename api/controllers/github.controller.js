const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: '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' });

async function fetchPullRequests(req, res) {
  const org = "rebootacademy-labs";
  const repo = "LAB-103-js-introduction";
  try {
    const pulls = await octokit.pulls.list({
      owner: org,
      repo: repo,
    });
    const forks = await octokit.repos.listForks({
        owner: org,
        repo: repo,
      });
    const userNamesFork = forks.data.map(fork => fork.owner.login);
    const userNames = pulls.data.map(pr => pr.user.login);
      return res.status(200).json({ userNames, userNamesFork });
  } catch (error) {
    console.error("Error fetching pull requests:", error);
  }
}

module.exports = {
  fetchPullRequests,
};
