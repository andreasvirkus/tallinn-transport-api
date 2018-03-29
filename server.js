const gtfs = require('gtfs')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')
const express = require('express')
const compression = require('compression')
const conf = require('./config')
const router = require('./api')

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
app.use('/api/v1', router)
app.get('/', (req, res) => res.redirect('/docs'))
app.get('/api', (req, res) => res.redirect('/docs'))
app.get('/schema', (req, res) => res.sendFile(path.join(__dirname, 'api', 'swagger.yaml')))
app.get('/docs', (req, res) => res.sendFile(path.join(__dirname, 'docs.html')))

// Our custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
app.use(function (req, res) {
  // TODO: Custom 404 page
  res.status(404).json({ error: `Lame, can't find that` })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))
