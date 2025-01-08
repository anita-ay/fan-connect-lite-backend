const express = require('express')

const userController = require('../controller/userController')

const router = express.Router()

router.post('/signup', userController.signupUser)
router.get('/all', userController.getUser)

module.exports=router
