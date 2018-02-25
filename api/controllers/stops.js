const gtfs = require('gtfs')
const mongoose = require('mongoose')

const config = require('../../config')
const mongoUrl = config.mongoUrl
const agencyKey = config.agencies[0].agency_key

mongoose.connect(mongoUrl)

// Get all stops for an agency
exports.getAll = (req, res) => {
  // TODO: Add limit validation to param
  const limit = parseInt(req.params.amount, 10) || 100
  gtfs.getStops({
    agency_key: agencyKey,
  }, {}, { limit })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getAll', err))
}

// Get a specific stop by stop_name
exports.getStop = (req, res) => {
  const name = req.params.name
  console.log('name:', name)

  gtfs.getStops({
    agency_key: agencyKey,
    stop_name: name
  })
  .then(stops => res.json(stops))
  .catch(err => console.log('err in getStop', err))
}
