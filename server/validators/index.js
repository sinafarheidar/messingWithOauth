const {validationResult} = require('express-validator');

// Runs our checks from auth.js (./auth) and returns any errors that are thrown
exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    
    // If our errors are not empty make our status a 422 a respond with the error message
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    next()
}