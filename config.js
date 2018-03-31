const env = process.env.NODE_ENV
const isDev = env !== 'production'
const mongoUrl = process.env.MONGODB_URI

module.exports = {
  env,
  isDev,
  port: process.env.PORT,
  agencyNames: [
    'Tallinna Linnatranspordi AS',
    'ELRON'
  ],
  gtfs: {
    verbose: true,
    mongoUrl,
    agencies: [
      {
        agency_key: 'tallinn',
        url: 'http://www.peatus.ee/gtfs/gtfs.zip',
        exclude: [
          'shapes',
          'transfers',
          'frequencies',
          // 'feed_info',
          'fare_rules',
          // 'fare_attributes',
        ]
      }
    ]
  }
}
