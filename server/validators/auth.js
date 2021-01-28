const { check } = require('express-validator');

// Checks our name, email, password to run some checks on them
exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is Required'),

    check('email')
        .isEmail()
        .withMessage('Must be a valid email'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];