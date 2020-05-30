const mongoose = require('mongoose');

const url = 'mongodb+srv://jonah:hackyourown1@cluster0-cccuc.mongodb.net/Recipes?retryWrites=true&w=majority'

console.log('connecting to...', url)

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log("error connecting to mongo", error.message)
})

const recipeSchema = new mongoose.Schema({
    name: String,
    category: String,
    course: String,
    ingredients: { type: Array, 'default' : []},
    vegetarian: Boolean,
    instructions: {type: Array, 'default' : []}
 })

 recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)