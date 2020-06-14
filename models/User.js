const mongoose = require('mongoose');
const uv = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

userSchema.plugin(uv, { type: 'mongoose-unique-validator' })

module.exports = mongoose.model('User', userSchema)