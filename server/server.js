const express = require('express');
const { auth } = require('google-auth-library');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const uri = 'mongodb+srv://sina:sina@nbachat.6shcr.mongodb.net/nbachat?retryWrites=true&w=majority'

mongoose.connect(uri, {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log('Error: ' + err)) 
// Importing routes
const authRoutes = require('./routes/auth')

// App Middleware
app.use(morgan('dev'));

// Middleware
app.use('/api', authRoutes) 

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening on Port: ${port}`)
})