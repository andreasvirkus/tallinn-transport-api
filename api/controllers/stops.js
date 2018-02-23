const gtfs = require('gtfs')
const config = require('../../config')
const agencyKey = config.agencies[0].agency_key

// Get all stops for an agency
const getAllStops = gtfs.getStops({
  agency_key: agencyKey
}).then(stops => {
  console.log('Got stops for agency:', agencyKey);
  console.log(stops);
});

// Get a specific stop by stop_id
gtfs.getStops({
  agency_key: 'caltrain',
  stop_id: '70011'
})
  .then(stops => {

  });

// Get a few stops
const stopIds = [
  '70011',
  '70012'
];
gtfs.getStops({
  agency_key: 'caltrain',
  stop_id: {
    $in: stopIds
  }
})
  .then(stops => {

  });

// Get all stops for a specific route and direction
gtfs.getStops({
  agency_key: 'caltrain',
  route_id: 'Lo-16APR',
  direction_id: 1
})
  .then(stops => {

  });

// Get all stops within a `radius` of the `lat`, `lon` specified.
// `radius` is optional and in miles. Default: 1 mile.
gtfs.getStops({
  within: {
    lat: 37.7749,
    lon: -122.4194,
    radius: 5
  }
})
  .then(stops => {

  });

module.exports = {
  getAll: getAllStops,
}