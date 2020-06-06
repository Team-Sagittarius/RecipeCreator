const express = require('express')
const ejs = require('ejs')

const app = express()
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser())

const cors = require('cors')
app.use(cors())

const Recipe = require('./models/Recipe')

const PORT = process.env.PORT || 3001;


app.set('view engine', 'ejs');

app.get('/',(request,response)=>{

  Recipe.find({}, (err, data) => {
      if (err) {
          console.log(err)
      } else {
          var recipes = data;
          response.render("index",{recipes:recipes});
      }
  })

})




/**
 * @definition
 * Post a recipe into MongoDB cluster
 */
app.post('/api/recipes/save', (request, response) => {
    body = request.body
    console.log(body)
    if (!body) {
        response.status(404).json({
            error: 'contents missing'
        })
    }
    else {
        if (!(body.course && body.name && body.category && body.ingredients && body.instructions)) {
            console.log("body.name...", body.name)
            response.status(200).json({
                error: 'malformed request: missing at least one recipe profperty'
            })
        } else {
            const newRecipe = new Recipe({
                name: body.name,
                category: body.category,
                course: body.course,
                ingredients : body.ingredients,
                vegetarian : body.vegetarian,
                instructions: body.instructions
            })
            newRecipe.save().then(resObject => {
                Recipe.find({}, (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var recipes = data;
                        response.redirect('http://localhost:3001/')
                        response.render("index",{recipes:recipes});
                    }
                })
            })
            .catch(error => {
                console.log("theres an error!...", error.message)
            })
        }
    }
})
/**
 * @description gets all recipes from mongoDB database, no filter
 */
app.get('/api/recipes', (request, response) => {
    Recipe.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log("did it!")
            response.json(data)
        }
    })
})

/**
 * @description find a recipe by its unique id (thx mongo)
 * If you guys want to, you could also use this as your key in react (for like a <li>)
 * Thats common practice
 */
app.get('/api/recipes/id/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    Recipe.findById(id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})


/**
 * @description finds a recipe by its unqiue name
 */
app.get('/api/recipes/name/:name', (request,response) => {
    const reqName = request.params.name
    Recipe.find({name:reqName}).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

/**
 * @description finds recipe(s) by their course
*/
app.get('/api/recipes/course/:course', (request,response) => {
    const reqCourse = request.params.course
    Recipe.find({name:reqName}).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.listen(PORT, () => {
    console.log(`Running this jawn on ${PORT}`)
})
