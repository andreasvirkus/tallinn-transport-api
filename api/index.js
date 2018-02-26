const express = require('express')

const stops = require('./controllers/stops')
const config = require('../config')
const agencies = require('./controllers/agencies')
const stopsTimes = require('./controllers/stopTimes')

const app = express()
const router = express.Router()

// router.use((req, res, next) => {
//   const { secret } = req.headers;

//   if (!config.isDev && secret !== configs.get('API_SECRET')) {
//     res.statusMessage = 'Invalid secret.'
//     return res.status(401)
//   }

//   next()
// })

router.get('/', (req, res) => {
  const docs = {
    status: 'Welcome to the (unofficial) Tallinn Transportation API!',
    endpoints: {
      '/stops/:amount': 'Get data about a certain number of stops',
      '/stop/:name': 'Get data about a specific stop'
    }
  }
  res.header('Content-Type','application/json');
  res.send(JSON.stringify(docs, null, 2));
})

router.get('/stops/:amount?', (req, res) => stops.getAll(req, res))
router.get('/stop/:name?', (req, res) => stops.getStop(req, res))
router.get('/area/:radius?', (req, res) => stops.getStopsInArea(req, res))
router.get('/agencies', (req, res) => agencies.getAgencies(req, res))

module.exports = router