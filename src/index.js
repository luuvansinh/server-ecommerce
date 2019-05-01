import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import methodOverride from 'method-override'
import compress from 'compression'
import helmet from 'helmet'
import { EventEmitter } from 'events'
import multiCores from './multi-cores'
import init from './init'
import route from './route'
import { response, env } from './utils'
import configs from './configs'

const mediator = new EventEmitter()
const app = express()

// 3rd party middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(compress())
app.use(methodOverride())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use('/', express.static(path.join(process.cwd(), 'uploads')))

// DOC
app.get('/apidoc', (req, res) => {
  if (env.isProduction) {
    res.json({ error: 'Not found' })
  } else {
    res.sendFile(path.join(`${process.cwd()}/apidoc/index.html`))
  }
})

// set multi cores
multiCores(app, mediator)

mediator.once('boot.ready', async () => {
  console.log('- BOOT'.padEnd(15), 'READY - ENV', process.env.NODE_ENV || 'development')
  await init(mediator)
  app.use(route())

  // Default locale to return error

  // catch 404 and forward to error handler
  app.use((req, res) => {
    console.log('404', req.url)
    return response.r404(res, configs.message.apiNotFound)
  })

  // error handler
  app.use((error, req, res) => {
    console.log('500', error)
    return response.r500(res, configs.message.serverError)
  })
})

export default app

export {
  mediator,
}
