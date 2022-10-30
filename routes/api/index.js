const router = require('express').Router();
const userRoutes = require("./userApi");
const thoughtRoutes = require("./postApi");

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;