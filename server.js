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
  origin: conf.isDev ? 'http://localhost:8080' : 'https://viimane.info',
  methods: ['GET']
}))

// TODO: Redirect root to /docs when documentation has a static page
app.get('/', (req, res) => res.redirect('/api'))
app.use('/api', router)

// Our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  // TODO: Custom 404 page
  res.status(404).json({ error: `Lame, can't find that` })
})

if (!conf.isDev) importData()

app.listen(port, () => console.log(`Server listening on port ${port}`))
