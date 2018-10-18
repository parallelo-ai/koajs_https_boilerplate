'use-strict'

// Configure KoaJS
const logger = require('koa-logger')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')

// Set up the Koa instance
const Koa = require('koa')
const app = new Koa()

// Load Server Configurations
const serverConfigurations = require('./config')

// Load the httpsOptions
// Generate those files with,
//
// openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
//
// put the same passphrase here, instead of 'ultra-secret-passphrase'
const fs = require('fs')
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'ultra-secret-passphrase'
}

// Set up the socket.io server
const server = require('https').createServer(httpsOptions, app.callback())

//
// Add Middleware Routes
//
app.use(logger())
app.use(cors())
app.use(bodyParser())

// Add the endpoint handlers
const get = require('./routes/get').get
const post = require('./routes/post').post
const postParameters = require('./routes/post').postParameters

// Add routes to the router
router
  .get('/get', get)
  .post('/post', post)
  .post('/post/:value', postParameters)

// Add the routes to the app instance
app.use(router.routes())

// Simple message to root api endpoint
app.use(async ctx => {
  ctx.response.status = 200 
  ctx.response.body = { message: 'The KoaJS API is UP!'}
})

console.log('Server listening at port ' + serverConfigurations.port)
server.listen(serverConfigurations.port)
