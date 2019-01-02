'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  const text = req.body.text

  if (!/^\d+$/.test(text)) {
    res.send('Error: enter a valid status code, such as 200')
    return
  }

  const data = {
    response_type: 'in_channel',
    text: '302: Found',
    attachments: [{
      image_url: 'https://http.cat/302.jpg'
    }]
  }
  res.json(data)
})

const server = app.listen(3000, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    server.address().port,
    app.settings.env
  )
})

