const gtfs = require('gtfs')

const config = require('../../config')
const gtfsConfig = config.gtfs
const agencyKey = gtfsConfig.agencies[0].agency_key

// Get all stoptimes for a specific stop
exports.getStopTimes = (req, res) => {
  const { stop } = req.params

  gtfs.getStoptimes({
    agency_key: agencyKey,
    stop_id: stop
  })
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
  })
  .then(stop => res.json(stop))
  .catch(err => console.error('getStopTimesForDirection:', err))
}

// Get all stoptimes for a route and sort by stop_id
gtfs.getStoptimes({
  agency_key: 'caltrain',
  route_id: '10'
}, {
    _id: 0
  }, {
    sort: { stop_id: 1 }
  })
  .then(stoptimes => {

  })
