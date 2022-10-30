const router = require('express').Router();
const {createPost, getThoughts} = require('../../controllers/thoughtController');

router.post("/:id", createPost);
router.get("/all", getThoughts);

module.exports = router;
