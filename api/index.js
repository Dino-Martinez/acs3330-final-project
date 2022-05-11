const express = require('express')
const fetch = require('node-fetch')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.post('/', async (req, res) => {
    const {platform, region, tag} = req.body
    const result = await fetch(`https://best-overwatch-api.herokuapp.com/player/${platform}/${region}/${tag}`)
    const json = await result.json()
    res.status(200).json(json)
})

app.listen(8080, () => console.log('Running on port 8080'))