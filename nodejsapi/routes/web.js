const express           = require('express');
const router            = express.Router();
const mainController    = require('../controllers/mainController')
const userController    = require('../controllers/userController')
const webMiddleware     = require('../middleware/web');

router.get('/',webMiddleware.checkJWT,mainController.index)

router.post('/signup',userController.signUp)
router.post('/signin',userController.signIn)


module.exports = router;