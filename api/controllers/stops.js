const gtfs = require('gtfs')
const mongoose = require('mongoose')

const config = require('../../config')
const agencyKey = config.agencies[0].agency_key
const mongoUrl = config.mongoUrl

mongoose.connect(mongoUrl)

// Get all stops for an agency
exports.getAll = (req, res) => {
  gtfs.getStops({
    agency_key: agencyKey
  }, {}, {
    limit: req.params.amount || 100
  }).then(stops => res.json(stops))
}

// Get a specific stop by stop_name
exports.getStop = (req,res) => {
  gtfs.getStops({
    agency_key: agencyKey,
    stop_name: req.params.name
  }).then(stops => res.json(stops))
}

// Get a collection of stops
// TODO: Get IDs from Firebase top search results for transportation type
const stopIds = [
  '70011',
  '70012'
]
// gtfs.getStops({
//   agency_key: 'caltrain',
//   stop_id: {
//     $in: stopIds
//   }
// })
//   .then(stops => {

//   })

// Get all stops for a specific route and direction
// gtfs.getStops({
//   agency_key: 'caltrain',
//   route_id: 'Lo-16APR',
//   direction_id: 1
// })
//   .then(stops => {

//   })

// Get all stops within a `radius` of the `lat`, `lon` specified.
// `radius` is optional and in miles. Default: 1 mile.
// gtfs.getStops({
//   within: {
//     lat: 37.7749,
//     lon: -122.4194,
//     radius: 5
//   }
// })
//   .then(stops => {

//   })
