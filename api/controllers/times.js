const gtfs = require('gtfs')

const config = require('../../config')
const gtfsConfig = config.gtfs
const agencyKey = gtfsConfig.agencies[0].agency_key
const sort = { departure_time: 1 }
const expose = {
  _id: 0,
  departure_time: 1,
  stop_id: 1
}

// Get all stoptimes for a specific stop
// TODO: Also search routes for this stop ID and append
// `trip_headsign` field value to each time object
exports.getStopTimes = (req, res) => {
  const { stop } = req.params

  gtfs.getStoptimes({
    agency_key: agencyKey,
    stop_id: stop
  }, expose, { sort })
  .then(times => res.json(times))
  .catch(err => console.error('getStopTimes:', err))
}

// Get all stoptimes for a specific stop, route and direction
exports.getStopTimesForDirection = (req, res) => {
  const { stop, route, direction } = req.params

  gtfs.getStoptimes({
    agency_key: agencyKey,
    stop_id: stop,
    route_id: route,
    direction_id: direction
  }, expose, { sort })
  .then(times => res.json(times))
  .catch(err => console.error('getStopTimesForDirection:', err))
}

// Get all stoptimes for a route and sort by stop_id
exports.getStopTimesForRoute = (req, res) => {
  gtfs.getStoptimes({
    agency_key: 'caltrain',
    route_id: '10'
  }, expose, { sort })
  .then(times => res.json(times))
  .catch(err => console.error('getStopTimesForRoute:', err))
}
