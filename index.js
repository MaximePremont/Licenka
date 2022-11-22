// Licenka
// by Pocker Team

const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
const port = process.env.PORT || 80

app.use(express.static('public'))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.get('/', async(req, res) => {
    res.redirect("https://github.com/MaximePremont/Licenka")
})

app.listen(port, () => {
    console.log(`Licenka server running on port ${port}`)
})

module.exports = app
