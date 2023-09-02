// LOAD ENV FILE START ==================================================
if (process.env.NODE_ENV === 'development') require('dotenv').config({ path: process.env.PWD + '/.env' })
// LOAD ENV FILE END ====================================================

async function startNodeApp () {
  if (process.env.USE_VAULT === 'true') await require('./lib/util/vault').run()
  var apm = require('elastic-apm-node')
  const __config = require('./config/index')
  if (process.env.NODE_ENV === 'development') console.debug = function () {}
  console.log('Loaded config environment : ' + process.env.NODE_ENV)
  require('./app.js').worker.start()
}

startNodeApp()
