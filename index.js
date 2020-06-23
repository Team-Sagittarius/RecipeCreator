const app = require('./app.js')
const Recipe = require('./models/Recipe')
const User = require('./models/User')
const bcrypt = require('bcrypt')
const passport = require('./config/passport')

const { response } = require('express')

const PORT = process.env.PORT || 3001;


app.set('view engine', 'ejs');

app.get('/', (request, response) => {

    Recipe.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            var recipes = data;
            response.render("login")
            //  response.render("index", { recipes: recipes });
        }
    })

})

app.get('/home', async (request, response) => {
    console.log('home sweet home')
    try {
        console.log('hiya!')
        console.log('is authed', request.isAuthenticated())
        if (request.isAuthenticated()) {
            await Recipe.find({}, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    var recipes = data;
                    response.render("index", { recipes: recipes });
                }
            })
        } else {
            response.status(400).json({ error: 'login to view this page' })
        }
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/login', (request, response) => {
    response.render("login")
})

app.get('/register', (request, response) => {
    response.render("register")
})

app.post('/user', async (request, response) => {
    try {
        const body = request.body
        const username = body.username
        const password = body.password
        if (!username || !password) {
            response.status(400).json({ error: 'missing username or password' })
        } else {
            const hash = await bcrypt.hash(body.password, 10)
            const newUser = new User({
                username: username,
                passwordHash: hash
            })
            const resUser = await newUser.save()
            response.json(resUser)
        }
    } catch (error) {
        (console.log(error.errors.username.kind))
        if (error.errors.username.kind === 'mongoose-unique-validator') {
            console.log('inside')
            response.status(400).json({ error: 'usernameNotUniqueError' })
        } else if (error.name === 'ValidationError') {
            response.status(400).json({ error: 'passwordLengthError' })
        }
    }
})


/**
 * Im going to leave in this logic here, so if you guys want to look over it the consone log errors might be helpful ;)
 */
app.post('/login', (req, res, next) => {
    console.log('just one right?')
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        console.log('why is user this?', user)
        if (err) {
            console.log('please no never throughr here right?')
            return next(err);
        }
        if (!user) {
            console.log('so user is falsy?', user)
            console.log('never throughr here right?')
            return res.redirect('/login')
        }
        req.login(user, (err) => {
            console.log('Inside req.login() callback')
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
            console.log(`req.user: ${JSON.stringify(req.user)}`)
            return res.redirect('/home')
        })
    })(req, res, next);
})

// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/home',
//         failureRedirect: '/login'
//     }))




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
        if (!(body.course && body.name && body.category && body.ingredients && body.instructions2)) {
            console.log("body.name...", body.name)
            response.status(200).json({
                error: 'malformed request: missing at least one recipe profperty'
            })
        } else {
          console.log(body.instructions2);
            const newRecipe = new Recipe({
                name: body.name,
                category: body.category,
                course: body.course,
                ingredients: body.ingredients,
                vegetarian: body.vegetarian,
                instructions: body.instructions2.split("\r\n")
            })
            newRecipe.save().then(resObject => {
                Recipe.find({}, (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        var recipes = data;
                        response.redirect('/home')
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
app.get('/api/recipes/name/:name', (request, response) => {
    const reqName = request.params.name
    Recipe.find({ name: reqName }).then(person => {
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
app.get('/api/recipes/course/:course', (request, response) => {
    const reqCourse = request.params.course
    Recipe.find({ name: reqName }).then(person => {
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
