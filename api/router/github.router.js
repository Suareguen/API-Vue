const router = require("express").Router();

const {
    fetchPullRequests,
    fetchPullRequestFiles,
    fetchPullRequestFilesWithContent,
    getBlobContent,
    fetchRepoFileStructure,
    updatePullRequests,
    createCommentAndClosePullRequest
} = require("../controllers/github.controller");

router.get("/", fetchPullRequests);
router.get("/details", fetchPullRequestFiles);
router.get("/content", fetchPullRequestFilesWithContent);
router.get("/blobContent", getBlobContent);
router.get("/structure", fetchRepoFileStructure);
router.get("/pullRequests/org/:org/repo/:repo", updatePullRequests);
router.get("/createCommentPullRequest/:repoName", createCommentAndClosePullRequest);


module.exports = router;
