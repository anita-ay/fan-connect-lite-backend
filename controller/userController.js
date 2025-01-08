const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status')


const {catchAsync} = require('../utils/catchAsync')

const AppError = require('../utils/appError')

const sendToken = (id)=>{
  return jwt.sign({
    id:id._id,fullName: id.fullName
  },
  process.env.JWT_SECRET, {
    expiresIn: 90
  }
)
}


const signupUser = catchAsync(async (req,res,next)=>{
  console.log('Hello starting')
  const {
    fullName,email,password,promoCode, howDidYouHearAboutUs
  } = req.body

  // const userEmail = await User.findOne({email})

  // const emailExist = await User.checkEmail(userEmail) 

  // if(emailExist){
  //   return next(new AppError('Email already exist',401))
  // }  

  // const newUser = User.create({
  //   fullName,email,password,promoCode,howDidYouHearAboutUs
  // })

  const token = sendToken(newUser)

  res.status(httpStatus.CREATED).json({
    status:'success',
    token,
    data:{
      users:{...newUser, token}
    }
  })
})
const getUser = catchAsync(async (req,res,next)=>{
  const user = User.find()


  res.status(httpStatus.CREATED).json({
    status:'success',
    data:{
      users:user
    }
  })
})





module.exports ={
  signupUser, getUser
}