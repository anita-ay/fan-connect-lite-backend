const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');

const celebritySchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  howDidYouHearAboutUs: String,
});

celebritySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hash(this.password, 12);
  next();
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

const validateCelebrity = (celebrity) => {
  const schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    howDidYouHearAboutUs: joi.string().optional().allow(''),
  });
  return schema.validate(celebrity);
};

module.exports = { Celebrity, validateCelebrity };
