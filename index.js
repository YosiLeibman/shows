// imports
const express = require('express')
const cors = require('cors')
const session = require('express-session')

// init
const app = express()

// middlewares
app.use(express.json()) // req.body
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
})) // enable cors
app.use(session({
    secret: "blah blah blah",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    }
})) // req.session

app.use('/users', require('./routes/users'))
app.use('/shows', require('./routes/shows'))
app.use('/admin', require('./routes/admin'))

app.use(express.static('build'))


// run
app.listen(80, () => console.log("server up and running on port 1000"))