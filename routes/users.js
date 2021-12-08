const { users } = require('../database/users')
const { allLoggedUsers } = require('../helpers/allLoggedUser')

const router = require('express').Router()

// open to everyone
router.post('/login', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send({ err: true, msg: "missing username or password" })
    }

    const user = users.find(us => us.username == username && us.password == password)

    if (!user) {
        return res.status(401).send({ err: true, msg: "incorrect username or password" })
    }

    req.session.user = { username, role: user.role }

    res.send({ msg: "you logged in successfully", username, role: user.role })
})

// open to everyone
router.post('/register', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).send({ err: true, msg: "missing username or password" })
    }

    const user = users.find(us => us.username == username)

    if (user) {
        return res.status(400).send({ err: true, msg: "username already taken" })
    }

    users.push({
        username,
        password,
        role: "user",
        orders: []
    })

    res.status(201).send({ msg: "user added successfully" })
})

// open to all registered users
router.delete('/logout', (req, res) => {
    req.session.destroy()
    res.send({ msg: "disconnected successfully" })
})

// open to all registered users
router.get('/profile', allLoggedUsers, (req, res) => {
    res.send(users.find(us => us.username == req.session.user.username).orders)
})

module.exports = router