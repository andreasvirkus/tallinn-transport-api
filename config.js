const env = process.env.NODE_ENV
const isDev = env !== 'production'
const devOnly = isDev ? true : false

module.exports = {
  env,
  isDev,
  'agencyNames': [
    'Tallinna Linnatranspordi AS',
    'ELRON'
  ],
  gtfs: {
    'verbose': true, // devOnly,
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
}
