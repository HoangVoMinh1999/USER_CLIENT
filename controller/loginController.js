require('dotenv').config();

var users = require('../myDatabase/users');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')
var flash = require("connect-flash");
var bcrypt=require('bcrypt');


exports.login = (req,res,next) => {
    res.render('login', { title: 'Best Store',message: req.flash('message')  });
}

