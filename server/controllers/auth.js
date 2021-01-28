const User = require('../models/user');
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "Email already taken",
      });
    }
    let newUser = new User({ name, email, password });

    newUser.save((err, success) => {
      if (err) {
        console.log("SIGNUP ERROR", err);
        return res.status(400).json({
          error: err,
        });
      }
      res.json({
        message: "Signup success! Please signin",
      });
    });
  } catch (error) {
    return res.status(400).json({
      error: "Email already taken",
    });
  }
};

/**
 * Check if user is trying to sign in but hasn't signed up yet
 * Check if password is match with hashed_password that is saved in db
 * If yes, generate token with expiry
 * The token will be sent to client
 * It will be used as jwt based authentication system
 * We can allow user to access protected routes if they have valid token
 * JWT Token is like password with expiry
 * In successful signin we will send user info and valid token
 * This token will be sent back to the server from client to access protected routes
 */
exports.signin = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please Sign up or Try again'
      })
    }

    // Authenticate, the authenticate() is from our User Schema
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Password does not match with email'
      })
    }

    // If email and password match we generate token and send to client
    const token = jwt.sign({ _id: user._id }, 'secretcode', { expiresIn: '7d' });
    const { _id, name, email, role } = user

    return res.json({
      token: token,
      user: { _id, name, email, role }
    })
  })
}


exports.googleLogin = (req, res) => {
  const client = new OAuth2Client("930536793342-0f8mnfpur38plu17lksqfk40m7g8vdh8.apps.googleusercontent.com")

  const { idToken } = req.body

  client.verifyIdToken({ idToken, audience: "930536793342-0f8mnfpur38plu17lksqfk40m7g8vdh8.apps.googleusercontent.com" })
    .then(response => {
      const { email_verified, name, email } = response.payload

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            console.log('user exists')
            const token = jwt.sign({ _id: user._id }, 'secretcode', { expiresIn: '7d' })
            const { _id, email, name, role } = user

            return res.json({
              token: token,
              user: { _id, email, name, role }
            })
          } else {
            console.log('user dne creating')
            let password = email + 'secretcode'
            user = new User({ name, email, password })

            user.save((err, data) => {
              if (err) {
                console.log('Error Google Login: ' + err)
                return res.status(400).json({
                  error: 'User Signup Failed'
                })
              }
              console.log('Creating Token')
              const token = jwt.sign({ _id: data._id }, 'secretcode', { expiresIn: '7d' })
              const { _id, email, name, role } = data
              return res.json({
                token: token,
                user: { _id, email, name, role }
              })

            })
          }
        })
      } else {
        console.log('Straight to error')
        return res.status(400).json({
          error: 'Google Login Failed...try again :('
        })
      }
    })
}
