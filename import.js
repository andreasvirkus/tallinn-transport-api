const gtfs = require('gtfs')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)

module.importData = () => {
  gtfs.import(config).then(() => {
    console.log('GTFS Import Successful')
    return mongoose.connection.close()
  }).catch(err => {
    console.error(err)
  })
}