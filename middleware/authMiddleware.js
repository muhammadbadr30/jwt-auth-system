const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {

    // trying to grap the JWT token from the req
    const token = req.cookies.jwt

    // check whether the token exist and is verified
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err){
                res.redirect('/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) =>{
            if(err){
                res.locals.user = null;
                next()
            } else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = {checkUser, requireAuth}