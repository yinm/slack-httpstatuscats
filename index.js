'use strict'

const httpstatus = require('./src/httpstatus')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  let message = {}

  if (req.body.text) {
    const code = req.body.text

    if (!/^\d+$/.test(code)) {
      res.send(':sob: U R DOIN IT WRONG. Enter a status code like 200')
      return
    }

    const status = httpstatus[code]
    if (!status) {
      res.send(`Bummere, ${code} is not a HTTP status code :scream_cat:`)
    }

    message = {
      response_type: 'in_channel',
      attachments: [
        {
          pretext: `${code}: ${status}`,
          image_url: `https://http.cat/${code}`
        }
      ]
    }
  } else {
    message = {
      response_type: 'ephemeral',
      text: ':cat: How to use `/httpstatus` command:',
      attachments: [
        {
          text: 'Type a status code after the command, _e.g._ `/httpstatus 404`'
        }
      ]
    }
  }

  res.json(message)
})

const server = app.listen(3000, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    server.address().port,
    app.settings.env
  )
})

