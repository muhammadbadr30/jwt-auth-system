const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes')

const app = express();

// Middlewares

app.use(express.static('public'))
app.use(express.json())


// view engine
app.set('view engine', 'ejs')

// database connection 
mongoose.connect(process.env.dbURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(result => app.listen(process.env.PORT))
    .catch(err => console.log(err))


// routes 
app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))
app.use(authRoutes)