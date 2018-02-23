const gtfs = require('gtfs')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)

gtfs.import(config)
  .then(() => {
    console.log('Import Successful')
    return mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  })