const gtfs = require('gtfs')

const config = require('../../config')
const gtfsConfig = config.gtfs
const agencyKey = gtfsConfig.agencies[0].agency_key
const agencyNames = config.agencyNames

// Get all stoptimes for a specific stop
exports.getStopTimes = (req, res) => {
  const { id } = req.params
  console.log('Query stop times for:', id);


  gtfs.getStoptimes({
    agency_key: agencyKey,
    stop_id: id
  })
  .then(times => {
    console.log('times:', times)
    return res.json(times)
  })
  .catch(err => console.error('getStopTimes:', err))
}

// Get all stoptimes for a specific stop, route and direction
gtfs.getStoptimes({
  agency_key: 'caltrain',
  stop_id: '70011',
  route_id: 'Lo-16APR',
  direction_id: 0
})
  .then(stoptimes => {

  });

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

  });