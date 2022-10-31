const router = require('express').Router();
const {newUser, getUsers, getOneUser, updateUser, deleteUser, addFriend, deleteFriend} = require("../../controllers/userController");

router.get('/all', getUsers);
router.post('/register', newUser);
router.route("/:id")
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

router.route("/:userId/friend/:friendId")
.post(addFriend)
.delete(deleteFriend);

module.exports = router;