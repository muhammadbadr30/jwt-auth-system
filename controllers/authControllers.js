const User = require('../models/User');

// handling email and password errors 
const handleErrors = (err) => {
    console.log(err.message, err.code);

    let errors = {email: '', password: ''}

    // handling duplicate error code 
    if(err.code === 11000){
        errors.email = "that email is already taken!"
        return errors;
    }

    // handling validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}


module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        
        // creating user using User model
        const user = await User.create({email, password})

        // sending response with success status code
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(404).json({errors})
    }
}

module.exports.login_post = (req, res) => {
    const {email, password} = req.body;

    console.log(email, password)
    res.send('new login')
}
