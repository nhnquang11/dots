const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [30, 'Username cannot be more than 30 characters long'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores']
  },
  name: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
  },
  profilePic: {
    type: String,
    default: 'https://res.cloudinary.com/dlzqcowpo/image/upload/v1716187185/dots/gtjhzcz5c2tzzmt5wow1.jpg'
  },
  passwordHash: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    console.log(returnedObject)
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
    }
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }}
)

const User = mongoose.model('User', userSchema)

module.exports = User