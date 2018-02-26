const gtfs = require('gtfs')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const compression = require('compression')
const conf = require('./config')
const router = require('./api')
const importData = require('./import').importData

const app = express()
const port = conf.port

app.use(helmet())
app.use(compression())
app.use(morgan('common'))
app.use(cors({
  origin: ['http://localhost:3001', 'viimane.info'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}))

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Visit /api for further info')
})

// Our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  res.status(404).json({ error: `Lame, can't find that` })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))

if (!conf.isDev) {
  console.log('Starting GTFS import...');
  importData()
}
