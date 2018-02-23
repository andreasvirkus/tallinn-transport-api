const gtfs = require('gtfs')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const compression = require('compression')
const router = require('./api')
const port = require('./config').port

const app = express()

app.use(helmet())
app.use(compression())
app.use(morgan('common'))
app.use(cors({
  origin: ['http://localhost:3001', 'viimane.info'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}))

app.use('/api', router)

/* istanbul ignore next */
if (!module.parent) {
  app.listen(port)
  console.log('Express started on port ', port)
}