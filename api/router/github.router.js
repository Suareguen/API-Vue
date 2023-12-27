const router = require("express").Router();

const {
    fetchPullRequests,
    fetchPullRequestFiles,
    fetchPullRequestFilesWithContent,
    getBlobContent,
    fetchRepoFileStructure,
    updatePullRequests,
    createCreateCommentAndClosePullRequest
} = require("../controllers/github.controller");

router.get("/", fetchPullRequests);
router.get("/details", fetchPullRequestFiles);
router.get("/content", fetchPullRequestFilesWithContent);
router.get("/blobContent", getBlobContent);
router.get("/structure", fetchRepoFileStructure);
router.get("/pullRequests", updatePullRequests);
router.get("/createCommentPullRequest", createCreateCommentAndClosePullRequest);








module.exports = router;
