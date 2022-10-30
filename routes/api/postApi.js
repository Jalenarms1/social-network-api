const router = require('express').Router();
const {createPost, getThoughts} = require('../../controllers/thoughtController');

router.get("/all", getThoughts);
router.route("/:id")
.post(createPost);

module.exports = router;
