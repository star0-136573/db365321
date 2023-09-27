const User = require('../models/user');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs');
const express = require('express')
const app = express()
app.use(express.json())





//ejs
exports.getLogin = (req, res, next) => {

    res.render('login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage:''
    });
  };


exports.admin = async (req, res) => {
      
  const name = req.body.username;
  const pass = req.body.password;

      Admin.findOne({ name: name })
       .then(user => {

        if (!user) {
      
          return  res.render('login', {
           path: '/login',
           pageTitle: 'Login',
           errorMessage: 'Invalid'  
        }
        )}

        bcrypt.compare(pass, user.password)
        .then(match=> {
          
         if(match)
         {
          User.find().then(user=>
          {
            res.render('admin', {
              path: '/admin',
              pageTitle: 'Admin',
              users:user,
              message: 'add new users'  
           });
          }
        )   
         }
        })
       })

   
          
     
  };  


exports.addUser = async (req, res) => {
      
       const name = req.body.username;
       const pass = req.body.password;
       const role = req.body.role;
       
        console.log(name);
        console.log(pass);
        console.log(! User.findOne({name:name}));

    await User.findOne({name:name}).then( u=>{
      
      if(!u){

      return bcrypt.hash(pass,12).then(ps=>{

        const user = new User({
          name:name,
          password:ps,
          role:role
        })
        return user.save();


      }
     )
      }
     })

     User.find().then(user=>
      {
        
        res.render('admin', {
          path: '/admin',
          pageTitle: 'Admin',
          users:user,
          message: 'success'  
       });
      })

  
 };  



//react
 
exports.postLogin = (req, res, next) => {
    
  
       const name = req.body.name;
       const pass = req.body.password;
       console.log(name)
       console.log(pass)
       
     User.findOne({name:name})
       .then(user=>{
       console.log(user.password)

      
       bcrypt.compare(pass,user.password).then(
        bool=>{
         

          if(bool) {
     
            const token = generateToken({name:name})
           
            res.json({
              auth: true,
              token: token,
              role:user.role,
              name:name,
            });
            
           }else{
            res.json({
              auth: false,
              token: null,
              role:'',
              name:''
    
            })
           }
        }
       )
      
 
        })
        .catch(err=>{

        console.log(err);
        res.json({
          message: 'failed!',
          
        });
       })
     
  };


  const generateToken=(user)=>{
    return  jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '10h' })
  }