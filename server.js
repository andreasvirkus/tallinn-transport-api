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

app.listen(port)
console.log('Express started on port', port)

if (!conf.isDev) {
  console.log('Starting GTFS import...');
  importData()
}
