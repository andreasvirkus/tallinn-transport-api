const gtfs = require('gtfs')
const config = require('./config').gtfs
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)

function importData() {
  gtfs.import(config)
    .then(() => console.log('...GTFS Import Successful!'))
    .catch(err => {
      console.error('Unable to import GTFS:', err)
      mongoose.connection.close()
    })
}

exports.importData = importData

!module.parent && importData() && mongoose.connection.close()
