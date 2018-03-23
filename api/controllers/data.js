const gtfs = require('gtfs')
const config = require('./config').gtfs

exports.importData = res => {
  gtfs.import(config)
    .then(() => res.json({ status: 200, message: '...GTFS Import Successful!' }))
    .catch(err => res.status(503).json({
      err,
      message: 'Unable to import GTFS:'
    }))
}
