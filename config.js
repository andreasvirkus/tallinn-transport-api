const env = process.env.NODE_ENV
const isDev = env !== 'production'
const devOnly = isDev ? true : false

module.exports = {
  env,
  isDev,
  'verbose': true, // devOnly,
  'mongoUrl': process.env.MONGODB_URI,
  'port': process.env.PORT,
  'agencyNames': [
    'Tallinna Linnatranspordi AS',
    'ELRON'
  ],
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
