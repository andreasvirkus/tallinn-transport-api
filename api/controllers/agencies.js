const gtfs = require('gtfs')
const mongoose = require('mongoose')

const config = require('../../config')
const mongoUrl = config.mongoUrl
const agencyKey = config.agencies[0].agency_key
const agencyNames = config.agencyNames

mongoose.connect(mongoUrl)

exports.getAgencies = (req, res) => {
  gtfs.getAgencies({
    agency_name: {
      $in: agencyNames
    }
  })
  .then(agencies => res.json({ agencies }))
  .catch(err => {
    res.status(500);
    res.statusMessage = console.trace(err).toString();
  })
}

exports.getRoute = (req, res) => {
  let { route } = req.params

  gtfs.getStops({
    agency_key,
    route_id: route
  })
  .then(stops => res.json({ stops }))
  .catch(err => {
    res.status(500)
    res.statusMessage = console.trace(err).toString()
  })
}

exports.getRouteById = (req, res) => {
  let { route } = req.params

  gtfs.getRoutes({
    route_id: route
  })
  .then(routes => res.json({ routes }))
  .catch(err => {
    res.status(500)
    res.statusMessage = console.trace(err).toString()
  })
}
