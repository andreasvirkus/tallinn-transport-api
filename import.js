const gtfs = require('gtfs')
const config = require('./config').gtfs
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)

function importData() {
  console.log('Config before import:', config)
  console.log('Starting GTFS import...')

  gtfs.import(config)
    .then(() => {
      console.log('...GTFS Import Successful!')
      mongoose.connection.close()
    })
    .catch(err => {
      console.error('Unable to import GTFS:', err)
      mongoose.connection.close()
    })
}

exports.importData = importData

!module.parent && importData()
