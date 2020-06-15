const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    category: String,
    course: String,
    ingredients: { type: Array, 'default': [] },
    vegetarian: Boolean,
    instructions: { type: Array, 'default': [] },
    url: { type: String, 'default': "//placehold.it/500x280" },
    description: { type: String, 'default': "" }
})

recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)
