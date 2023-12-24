const router = require("express").Router();

const {
    fetchPullRequests,
    fetchPullRequestFiles,
    fetchPullRequestFilesWithContent,
    getBlobContent,
    fetchRepoFileStructure
} = require("../controllers/github.controller");

router.get("/", fetchPullRequests);
router.get("/details", fetchPullRequestFiles);
router.get("/content", fetchPullRequestFilesWithContent);
router.get("/blobContent", getBlobContent);
router.get("/structure", fetchRepoFileStructure);






module.exports = router;
