const {User, Thought} = require("../models/index");

module.exports = {
    async newUser (req, res){
        try{
            let newUser = await User.create(req.body);

            res.json(newUser)

        } catch(err){
            res.json(err)
        }
    },
    
    async getUsers(req, res){
       let users = await User.find();

       console.log(users);
       res.json(users);
    },

    async getOneUser(req, res) {
        try {
            let oneUser = await User.findOne({_id: req.params.id}).populate("thoughts");
            res.json(oneUser);

        } catch (error) {
            res.json(error)
        }
    },

    async updateUser(req, res) {
        try {
            let updatedUser = await User.findOneAndUpdate(
                {_id: req.params.id},
                req.body,
                {new: true}
            )

            res.json(updatedUser)
            
        } catch (error) {
            res.json(error);
        }
    },

    async deleteUser(req, res) {
        try {
            let deletedUser = await User.findOneAndDelete({_id: req.params.id});
           
            let deltedThoughts = await Thought.deleteMany({username: deletedUser.username})

            res.json(deletedUser)
            
        } catch (error) {
            res.json(error)
        }
    },

    async addFriend(req, res) {
        try{
            let newFriend = await User.findOne({_id: req.params.friendId});

            let addingFriendTo = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$addToSet: {friends: newFriend._id}},
                {new: true}
            )

            res.json(addingFriendTo);

        }catch(err){
            res.json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            let friendToDelete = await User.findOneAndUpdate({_id: req.params.friendId}, {$pull: {friends: req.params.userId}});

            let deletedFrom = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: {friends: friendToDelete._id}},
                {new: true}
            )

            res.json(deletedFrom);


        } catch (error) {
            res.json(error)
        }
    }
}