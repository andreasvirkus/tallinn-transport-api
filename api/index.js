const express = require('express')
const stops = require('./controllers/stops')
const stopsTimes = require('./controllers/stopTimes')

const app = express()
const router = express.Router()


router.get('/', (req, res) => {
  const docs = {
    status: 'Welcome to the (unofficial) Tallinn Transportation API!',
    endpoints: {
      '/stops/:amount': 'Get a number of stops',
      '/stop/:name': 'Get a specific stop'
    }
  }
  res.header('Content-Type','application/json');
  res.send(JSON.stringify(docs, null, 2));
})

router.get('/stops/:amount?', (req, res) => stops.getAll(req, res))
router.get('/stop/:name?', (req, res) => stops.getStop(req, res))

// Our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
router.use(function (req, res) {
  res.status(404).json({ error: "Lame, can't find that" })
})

module.exports = router