const gtfs = require('gtfs')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl)

exports.importData = () => {
  gtfs.import(config)
    .then(console.log('GTFS Import Successful'))
    .then(Promise.resolve())
    .then(mongoose.connection.close())
}
