const express = require('express')
const mongoose = require('mongoose')

const config = require('../config')
const stops = require('./controllers/stops')
const times = require('./controllers/stopTimes')
const routes = require('./controllers/routes')
const data = require('./controllers/data')

const app = express()
const router = express.Router()

mongoose.connect(config.gtfs.mongoUrl)

// router.use((req, res, next) => {
//   const { secret } = req.headers;

//   if (!config.isDev && secret !== config.get('API_SECRET')) {
//     res.statusMessage = 'Invalid secret.'
//     return res.status(401)
//   }

//   next()
// })

router.get('/', (req, res) => {
  const docs = {
    status: 'Welcome to the (unofficial) Tallinn Transportation API!',
    endpoints: {
      '/stop/time/:id': 'Get time table for a specific stop',
      '/stop/:id': 'Get data about a specific stop',
      '/stops/area/:lat/:lon': 'Get stops in a small radius for the provided coordinates',
      '/stops/center': 'Get stops in the city center',
      '/route/:id': 'Get a specific route',
      '/routes/:id': 'Get the routes for that stop ID'
    }
  }
  res.header('Content-Type','application/json');
  res.send(JSON.stringify(docs, null, 2));
})

router.get('/stop/:id', (req, res) => stops.getStop(req, res))
router.get('/stops/area/:lat/:lon', (req, res) => stops.getStopsInArea(req, res))
router.get('/stops/center', (req, res) => stops.getStopsInCenter(req, res))
router.get('/route/:id', (req, res) => routes.getRoute(req, res))
router.get('/routes/:id', (req, res) => routes.getRoutesByStopId(req, res))
router.get('/times/detail/:stop/:route/:direction', (req, res) => times.getStopTimesForDirection(req, res))
router.get('/times/:stop', (req, res) => times.getStopTimes(req, res))
router.post('/data/update', (req, res) => data.importData(res))

module.exports = router
