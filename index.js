import express from 'express';
import helmet from 'helmet';
import morganLogger from 'morgan';
import nconf from './app/config/nconf.js';
import bodyParser from 'body-parser';

const app = express()

app
  .use(helmet())
  .use(morganLogger('dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({'extended': true}))

app.use(function (request, response, next) {
  'use strict'

  let origin = request.headers.origin

  let allowedOrigins = ['http://127.0.0.1:8020',
                        'http://localhost:8020',
                        'http://127.0.0.1:9000',
                        'http://localhost:9000',
                        'https://rtimbo.com',
                        'https://timbo-rafa.github.io']

  if (allowedOrigins.indexOf(origin) > -1) {
    response.header('Access-Control-Allow-Origin',	origin)
  }

  response.header('Content-Encoding', 'UTF-8')
  response.header('Content-Language', 'en')
  next()
})

import clients from './app/api/clients.js'
app.use('/clientes', clients)

// server ping (last route)
app.get('/', function pingSuccess (req, res, next) {
    'use strict'

    console.log('Server ping on /')
    res.status(200).send({})
})

app.use(function handleErrors (error, request, response, next) {
    'use strict'

    console.error('handleErrors:',error)
  
    if(error) {
        console.error('error.message', error.message)
        return response.status(400).send({ error: error })
    }
})

app.listen(nconf.get('PORT'), nconf.get('HOST'), function () {
    console.log('Server listening at http://%s:%s', nconf.get('HOST'), nconf.get('PORT'));
});

export default app