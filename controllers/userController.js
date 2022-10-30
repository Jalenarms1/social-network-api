const {User} = require("../models/index");

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

    getOneUser(req, res) {
        try {
            User.findOne({_id: req.params.id})
                .populate("thoughts")
                .then(resp => {
                    res.json(resp)
                });

            
            

        } catch (error) {
            res.json(error)
        }
    }
}