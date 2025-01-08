const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    validate:[validator.isEmail, 'Please provide a valid email']

  },

  password: {
    type:String,
    required:[true, 'password is required'],
    minLength: 6,
  },
  howDidYouHearAboutUs: String,
  promoCode: String,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.password = undefined
  next();
});


userSchema.methods.checkEmail = async function (email){
  if(this.email){
    return true
  }else {
    return false
  }
}
const User = mongoose.model('User', userSchema);



module.exports = User
