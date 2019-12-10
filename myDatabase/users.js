require('dotenv').config();

var mongoose=require('mongoose');
var products=require('../models/users');
var express = require('express');
var router = express.Router();
var mongodb=require('mongodb');
var bcrypt=require('bcrypt');

const MongoClient = require('mongodb').MongoClient;
var uri = process.env.DB_LOCALHOST || process.env.DB_ATLAS;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

///---Database
var schema=mongoose.Schema;

var userSchema=new schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        min:6,
    },
    password:{
        type:String,
        required:true,
        min:6,
    },
})

module.exports= mongoose.model('users',userSchema,'users');
function user(name,username,password){
    this.name=name;
    this.username=username;
    this.password=password;
}
var user=new user(
    'aeminhdui',
    'aeminhdui',
    '123456'
);
client.connect(err => {
    const collection = client.db("guest").collection("users");
    var salt=bcrypt.genSaltSync(10);
    user.password=bcrypt.hashSync(user.password,salt);
    collection.insertOne(user,function(err)
    {
        if (err) throw err;
        console.log("insert user successfully !!!!");
    });
    client.close();
  });
