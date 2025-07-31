const router = require('express').Router();
const {
  getAuthController,
  loginController,
  registerController, 
} = require('../controllers/AuthController');

router.get('/', getAuthController);

router.post('/login', loginController);


router.post('/register', registerController);

module.exports = router;
