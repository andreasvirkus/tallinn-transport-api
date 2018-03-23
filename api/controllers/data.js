const gtfs = require('gtfs')
const config = require('../../config').gtfs

exports.importData = res => {
  res.json({ message: 'GTFS parsing and data import started' })
  gtfs.import(config)
    .then(() => console.log('GTFS import successful'))
    .catch(err => console.error('Unable to import GTFS:', err))
}
