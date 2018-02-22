const gtfs = require('gtfs')
const mongoose = require('mongoose')
const config = require('./config.json')

mongoose.connect(config.mongoUrl)

gtfs.import(config)
  .then(() => {
    console.log('Import Successful')
    return mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  })