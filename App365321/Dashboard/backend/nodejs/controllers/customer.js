const Customer = require('../models/customer');
const jwt = require('jsonwebtoken')
const express = require('express')
const app = express()
app.use(express.json())


exports.getCustomer = (req,res) => {

  
    Customer.find({}).then(customers=>{
        
        res.json({
            customer:customers
        })
    })
}

exports.createCustomer = async (req,res) => {

  const newCustomer = req.body.newCustomer
  console.log(newCustomer)
  const email = newCustomer.Email
  await Customer.findOne({Email:email}).then( cus=>{
        if(!cus){
                   
            const customer = new Customer(newCustomer)
            customer.save()

            res.json({
                message:'success'
            })

         }else{
          
         }
        
    
   
    }

  )
}

exports.deleteCustomer = async (req,res) =>{

    const id = req.body.id;
    console.log(id)
    await Customer.findOne({_id:id}).then( cus=>{
        if(cus){
                   
            console.log(cus)
            cus.remove()

            
            res.json({
                message:'success'
            })

         }else{
          
         }
           })
 }

exports.updateCustomer = async (req,res) =>{

    const customer = req.body.customer
    console.log(customer)
     const id = req.body.customer._id
     delete customer._id
    await Customer.findOneAndUpdate({_id:id},customer).then( result=>{
       
           
            res.json({
                message:'success'
            })

       
           })
 }