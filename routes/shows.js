const { shows } = require('../database/shows')
const { users } = require('../database/users')
const { onlyUsers } = require('../helpers/onlyusers')

const router = require('express').Router()

// open to everyone
router.get('/', (req,res)=>{
    res.send(shows)
})

// open only to users
router.post('/buy/:showid', onlyUsers, (req,res)=>{
    const { showid } = req.params
    const show = shows.find(s => s.id === showid)
    if (!show) {
        return res.status(400).send({ err: true, msg: "show didn't found" })
    }
    show.tickets--
    const user = users.find(us => us.username == req.session.user.username)
    user.orders.push(show)
    res.send({msg:"the ticket are all yours, enjoy it"})
})

// open only to users
router.post('/cancel/:showid', onlyUsers, (req,res)=>{
    const { showid } = req.params
    const show = shows.find(s => s.id === showid)
    if (!show) {
        return res.status(400).send({ err: true, msg: "show didn't found" })
    }
    show.tickets++
    const user = users.find(us => us.username == req.session.user.username)
    user.orders = user.orders.filter(sw=> sw.id !== showid)
    res.send({msg:"the money will show up in your account up to 3 days"})
})




module.exports = router