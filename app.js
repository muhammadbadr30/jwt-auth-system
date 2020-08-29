const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')
const cookieParser = require('cookie-parser')
const app = express();

// Middlewares

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

// database connection 
mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(result => app.listen(process.env.PORT))
    .catch(err => console.log(err))


// routes 
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'))
app.use(authRoutes)