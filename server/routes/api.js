const express = require('express')
const request = require('request')
const router = express.Router()

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756",
    "hawks": "1610612737",
}

let dreamTeam = []

const json = {
    data: {}
}

request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response) {
        json.data = JSON.parse(response.body).league.standard
})

router.get('/teams/:teamName', function(req, res) {
    let id = teamToIDs[req.params.teamName]    
        team = json.data
            .filter(t => t.teamId === id && t.isActive)
            .map(t => { return { firstName: t.firstName, lastName: t.lastName, jersey: t.jersey, pos: t.pos }})
            .map(t => {
            if (dreamTeam.some(d => d.firstName === t.firstName && d.lastName === t.lastName)) {
                return {...t, dreamTeam: true}
            } else {
                return {...t, dreamTeam: false}
            }
        })   
        res.send(team)
})

router.put('/team', function(req, res) {
    let name = req.body.teamName
    let id = req.body.teamId
    teamToIDs[name] = id
    res.end()
})

router.get('/dreamTeam', function(req, res) {
    res.send(dreamTeam)
})

router.post('/roster', function(req, res) {
    if (dreamTeam.length > 4) { return }
    let player = req.body
    if (dreamTeam.some(d => d.firstName === player.firstName && d.lastName === player.lastName)) { return }
    dreamTeam.push(player)
    res.end()
})

router.delete('/roster', function(req, res) {
    let player = req.body
    let playerId = dreamTeam.findIndex(d => d.firstName === player.firstName && d.lastName === player.lastName)
    dreamTeam.splice(playerId, 1)
    res.end()
})

module.exports = router