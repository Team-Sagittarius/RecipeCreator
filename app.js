const express = require('express')

const ejs = require('ejs')
const { v4: uuidV4 } = require('uuid');
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuidV4() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


app.use(bodyParser())
app.use(cors())

const url = 'mongodb+srv://jonah:hackyourown1@cluster0-cccuc.mongodb.net/Recipes?retryWrites=true&w=majority'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to mongo'))
    .catch(error => console.log(error.message))

module.exports = app