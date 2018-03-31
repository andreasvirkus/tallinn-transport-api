const gtfs = require('gtfs')

const config = require('../../config')
const gtfsConfig = config.gtfs
const agencyKey = gtfsConfig.agencies[0].agency_key
const agencyNames = config.agencyNames

// Get a specific route
exports.getRoute = (req, res) => {
  const { id } = req.params

  gtfs.getRoutes({
    agency_key: agencyKey,
    route_id: id
  })
  .then(routes => res.json(routes))
  .catch(err => console.error('getRoute:', err))
}

// Get routes by stop_id
exports.getRoutesByStopId = (req, res) => {
  const { id } = req.params

  gtfs.getRoutes({
    agency_key: agencyKey,
    stop_id: id
  })
  .then(routes => res.json(routes))
  .catch(err => console.log('getRoutesByStopId:', err))
}

exports.getDirectionsByRoute = (req, res) => {
  const { route } = req.params

  gtfs.getDirectionsByRoute({
    agency_key: agencyKey,
    route_id: { route }
  })
  .then(directions => res.json(directions))
  .catch(err => console.error('getDirectionsByRoute:', err))

}