const express = require('express');
const Celebrity = require('../models/Celebrity');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validateCelebrity } = require('../models/Celebrity');
const { validateUser } = require('../models/User');

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

const router = express.Router();

const signupUser = catchAsync(async (req,res,next)=>{
  const {
    fullName,email,password,promoCode, howDidYouHearAboutUs
  } = req.body

  const newUser = User.create({
    fullName,email,password,promoCode,howDidYouHearAboutUs
  })

  const token = sendToken(newUser)

  res.status(httpStatus.CREATED).json({
    status:'success',
    token,
    data:{
      users:newUser
    }
  })
})

// Celebrity Signup
// router.post('/celebrities/signup', async (req, res) => {
//   try {
//     const { error } = validateCelebrity(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });

//     const existingCelebrity = await Celebrity.findOne({ email: req.body.email });
//     if (existingCelebrity) return res.status(400).json({ message: 'Email already exists' });

//     const celebrity = new Celebrity(req.body);
//     await celebrity.save();
//     res.json({ message: 'Celebrity signed up successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error signing up celebrity' });
//   }
// });

// // Celebrity Login
// router.post('/celebrities/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const celebrity = await Celebrity.findOne({ email });
//     if (!celebrity) return res.status(401).json({ message: 'Invalid email or password' });

//     const isValidPassword = await bcrypt.compare(password, celebrity.password);
//     if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });

//     const token = jwt.sign({ celebrityId: celebrity._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in celebrity' });
//   }
// });

// // User Signup
// router.post('/users/signup', async (req, res) => {
//   try {
//     const { error } = validateUser(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });

//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const user = new User(req.body);
//     await user.save();
//     res.json({ message: 'User signed up successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error signing up user' });
//   }
// });

// // User Login
// router.post('/users/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid email or password' });

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) return res.status(401).json({ message: 'Invalid email or password' });

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in user' });
//   }
// });

// module.exports = router;
