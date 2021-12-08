const { v4 } = require("uuid");


module.exports.shows = [
    {
        id: v4(),
        name: "Psychopath",
        artist: "Johnatan Barak",
        price: 120,
        tickets: 25,
        location: "Tel Aviv",
        date: "27/10/2021"
    },
    {
        id: v4(),
        name: "Summer Tour",
        artist: "Metalikah",
        price: 320,
        tickets: 125,
        location: "Live Park Somewhere",
        date: "29/11/2021"
    },
    {
        id: v4(),
        name: "Spring Tour",
        artist: "Bon Jovi",
        price: 500,
        tickets: 100,
        location: "Forum Somewhere in the South",
        date: "15/02/2022"
    },
]