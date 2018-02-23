const gtfs = require('gtfs')

// Get all stoptimes for a specific stop
gtfs.getStoptimes({
  agency_key: 'caltrain',
  stop_id: '70011'
})
  .then(stoptimes => {

  });

// Get all stoptimes for a specific stop, route and direction
gtfs.getStoptimes({
  agency_key: 'caltrain',
  stop_id: '70011',
  route_id: 'Lo-16APR',
  direction_id: 0
})
  .then(stoptimes => {

  });

// Get all stoptimes for a specific stop and service_id
gtfs.getStoptimes({
  agency_key: 'caltrain',
  stop_id: '70011',
  service_id: 'CT-16APR-Caltrain-Weekday-01'
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