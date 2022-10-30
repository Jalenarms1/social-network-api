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
    }
}