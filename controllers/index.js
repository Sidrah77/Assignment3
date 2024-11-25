let express = require('express');
let router = express.Router();


let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', { title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next)=>{
    res.render('index', { title: 'About'});
}

module.exports.displayProductPage = (req, res, next)=>{
    res.render('index', { title: 'Product'});
}

module.exports.displayServicePage = (req, res, next)=>{
    res.render('index', { title: 'Service'});
}

module.exports.displayContactPage = (req, res, next)=>{
    res.render('index', { title: 'Contact'});
}

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',(err,user, info) =>
    {
        // server error
        if(err)
        {
            return next(err);
        }
        //is a login error
        if(!user)
        {
            req.flash('loginMessage',
                'AuthenticationError');
                return req.redirect('/login');
        }
        req.login(user,(err) => {
            if(err)
            {
                return next(err)
            }
            return res.redirect('/book-list');
        })
    }) (req, res, next)
}
module.exports.displayRegisterPage = (req, res, next)=>{
    //check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/resister', 
        {
            title: 'Register',
            message: req.flash('registerMessage'),
            diplayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }


}
module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password,
        email:req.body.email,
        displayName: req.body.displayName
    })
    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting the new user");
            if(err.name=="UserExistsError")
                {
                    req.flash('registerMessage',
                    'Registration Error: User Already Exists');
                }
            return res.render('auth/register',
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName:''
            });
        }
        else
        {
            //if registration is not successful
            return passport.authenticate('local')(req, res, ()=>{
                res.redirect('book-list');
            })
        }
    })
}
module.exports.performLogout = (req,res,next)=>
{
    req.logout();
    res.redirect('/');
}


