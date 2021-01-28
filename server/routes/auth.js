const express = require('express')
const router = express.Router()

const { signup, signin, googleLogin } = require('../controllers/auth');

// Import Validation (../validators)
const { userSignupValidator, userSigninValidator } = require('../validators/auth')
const { runValidation } = require('../validators/index')

// We add our middleware validators to make sure the user has inputted everything correctly
router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.post('/google-login', googleLogin);
module.exports = router