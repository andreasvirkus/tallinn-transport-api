const gtfs = require('gtfs')
const mongoose = require('mongoose')

const config = require('../../config')
const gtfsConfig = config.gtfs
const mongoUrl = gtfsConfig.mongoUrl
const agencyKey = gtfsConfig.agencies[0].agency_key
const agencyNames = config.agencyNames

mongoose.connect(mongoUrl)

// Get all stops for an agency
// TODO: Remove
// Was only used for initial testing
exports.getAll = (req, res) => {
  const limit = parseInt(req.params.amount, 10) || 100

  gtfs.getStops({
    agency_key: agencyKey,
  }, {}, { limit })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getAll', err))
}

// Get a specific stop by stop_name
exports.getStop = (req, res) => {
  const { name } = req.params
  console.log('name:', name)

  gtfs.getStops({
    agency_key: agencyKey,
    stop_name: name
  })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getStop', err))
}

// Get a specific stop by stop_id
exports.getStopById = (req, res) => {
  const { id } = req.params

  gtfs.getStops({
    agency_key: agencyKey,
    stop_id: id
  })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getStop', err))
}

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
  }, {
    unique: true
  })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getStopsInCenter', err))
}

exports.getStopsInArea = (req, res) => {
  const { lat, lon } = req.params

  // Get all stops within a `radius` of the `lat`, `lon` specified.
  // `radius` is optional and in miles. Default: 1 mile.
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
  }, {
    unique: true
  })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getStopsInRange', err))
}
