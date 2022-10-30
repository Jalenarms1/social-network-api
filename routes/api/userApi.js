const router = require('express').Router();
const {newUser, getUsers, getOneUser} = require("../../controllers/userController");

router.get('/all', getUsers);
router.post('/register', newUser);
router.get('/:id', getOneUser);

module.exports = router;