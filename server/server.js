const express = require('express')
const path = require('path')
const api = require('../server/routes/api')
const bodyParser = require('body-parser')
const server = express()
const port = 3000

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.use(express.static(path.join(__dirname, '..', 'dist')))
server.use(express.static(path.join(__dirname, '..', 'node_modules')))
server.use('/', api)

server.listen(port, () => console.log(`Running server on port ${port}`))