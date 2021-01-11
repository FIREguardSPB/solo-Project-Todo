const router = require('express').Router()

const controller = require('../controllers/auth')
const { sessionChecker } = require("../middleware/auth");
const {isLogin} = require('../middleware/auth')

router.get('/signup', controller.getSignupPage)
router.post('/signup', controller.createUser)
router.post('/', controller.postLogin)
module.exports = router;
