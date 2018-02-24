const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  'verbose': isDev ? true : false,
  'skipDelete': true,
  'mongoUrl': process.env.MONGODB_URI,
  'port': process.env.PORT,
  'agencies': [
    {
      'agency_key': 'tallinn',
      'url': 'http://www.peatus.ee/gtfs/gtfs.zip',
      'exclude': [
        'shapes',
        'fare_rules',
        'fare_attributes',
        'feed_info',
        'frequencies',
        'transfers.txt',
        'trips'
      ]
    }
  ]
}
