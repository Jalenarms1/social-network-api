const router = require('express').Router();
const {createPost, getThoughts, createReaction, deleteReaction, getOneThought, updateThought, deleteThought} = require('../../controllers/thoughtController');

router.get("/all", getThoughts);
router.route("/:thoughtId").get(getOneThought)
.put(updateThought)
.delete(deleteThought);

router.route("/:id")
.post(createPost);

router.route("/:thoughtId/reaction/:userId")
.post(createReaction);

router.route("/:thoughtId/reaction/:reactionId")
.delete(deleteReaction);

module.exports = router;
