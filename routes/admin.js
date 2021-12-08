const { v4 } = require('uuid')
const { shows } = require('../database/shows')
const { onlyAdmins } = require('../helpers/onlyAdmins')

const router = require('express').Router()

router.use(onlyAdmins)

router.post('/newshow', (req, res) => {
    const { name, artist, price, tickets, locatoin, date } = req.body

    if (!name || !artist || !price || !tickets || !locatoin || !date) {
        return res.status(400).send({ err: true, msg: "missing some info" })
    }

    shows.push({
        id: v4(),
        name,
        artist,
        price,
        tickets,
        locatoin,
        date
    })
    res.send({msg:"show added successfully"})
})

module.exports = router