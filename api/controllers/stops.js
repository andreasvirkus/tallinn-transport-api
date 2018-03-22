const gtfs = require('gtfs')

const config = require('../../config')
const gtfsConfig = config.gtfs
const agencyKey = gtfsConfig.agencies[0].agency_key
const agencyNames = config.agencyNames

// Get a specific stop by stop_id
exports.getStop = (req, res) => {
  const { id } = req.params

  gtfs.getStops({
    agency_key: agencyKey,
    stop_id: id
  })
  .then(stops => res.json(stops))
  .catch(err => console.error('getStop:', err))
}

// Get all stops within 0.3 mile radius of city center
// "city center" simply chosen as a spot in Tallinn, could optimise
exports.getStopsInCenter = (req, res) => {
  gtfs.getStops({
    within: {
      lat: 59.435787,
      lon: 24.750738,
      radius: 0.3
    }
  }, {
    _id: 0,
    stop_name: 1,
    stop_id: 1
  })
  .then(stops => res.json(stops))
  .catch(err => console.error('getStopsInCenter:', err))
}

// Get all stops within a `radius` of the `lat`, `lon` specified.
// `radius` is optional and in miles. Default: 1 mile.
exports.getStopsInArea = (req, res) => {
  const { lat, lon } = req.params

  gtfs.getStops({
    within: {
      lat,
      lon,
      radius: 0.1
    }
  }, {
    _id: 0,
    stop_name: 1,
    stop_id: 1
  })
  .then(stops => res.json(stops))
  .catch(err => console.error('getStopsInArea:', err))
}

// Get all stops for a specific route and direction

// Get a specific route
exports.getStopsByRoute = (req, res) => {
  const { id } = req.params

  gtfs.getStops({
    agency_key: agencyKey,
    route_id: id,
    direction_id: 1
  })
  .then(stops => res.json(stops))
  .catch(err => console.error('getStopsByRoute:', err))
}