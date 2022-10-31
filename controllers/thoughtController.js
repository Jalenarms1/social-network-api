const {User, Thought} = require("../models");

module.exports = {
    async createPost(req, res) {
        try{
            const fromUser = await User.findOne({_id: req.params.id});


            const newPost = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: fromUser.username
            })

            let updateUserWithId = await User.findOneAndUpdate(
                {_id: req.params.id},
                {$push: {thoughts: newPost._id}},
                {new: true}
            )

            res.json(newPost);

        }catch (err){
            res.json(err);
        }
    },
    async getThoughts(req, res) {
        try {
            const allThoughts = await Thought.find();

            res.json(allThoughts);

        } catch (error) {
            res.json(error)
        }
    },

    async getOneThought(req, res){
        try {
            let oneThought = await Thought.findOne({_id: req.params.thoughtId})
            
            res.json(oneThought);

        } catch (error) {
            res.json(error)
        }
    },
    async updateThought(req, res){
        try {
            let updatedThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                req.body,
                {new: true}
            )

            res.json(updatedThought);

        } catch (error) {
            res.json(error)
        }
    },

    async deleteThought(req, res){
        try {
            let deletedThought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

            let removeThoughtFromUser = await User.findOneAndUpdate(
                {username: deletedThought.username},
                {$pull: {thoughts: {_id: deletedThought._id}}}
            )

            res.json(deletedThought);

        } catch (error) {
            res.json(error)
        }
    },

    async createReaction(req, res){
        try {

            let userOfReaction = await User.findOne({_id: req.params.userId})

            let newReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$push: {reactions: {
                    reactionBody: req.body.reactionBody,
                    username: userOfReaction.username
                }}},
                {new: true}
            )

            console.log(newReaction);
            res.json(newReaction);
            
        } catch (error) {
            res.json(error)
        }
    },

    async deleteReaction(req, res){
        try {
            let deletedReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {_id: req.params.reactionId}}},
                {new: true}
            )

            res.json(deletedReaction);

        } catch (error) {
            res.json(error)
        }
    }
}