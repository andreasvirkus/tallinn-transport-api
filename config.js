const env = process.env.NODE_ENV
const isDev = env !== 'production'

module.exports = {
  env,
  isDev,
  'port': process.env.PORT,
  'agencyNames': [
    'Tallinna Linnatranspordi AS',
    'ELRON'
  ],
  gtfs: {
    'verbose': true, // isDev,
    'mongoUrl': process.env.MONGODB_URI,
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
          'transfers',
          'trips'
        ]
      }
    ]
  }
}
