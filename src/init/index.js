import connectDb from './db'
import redis from './redis'

export default async (mediator) => {
  await connectDb()
  redis.runRedis(mediator)
  require('./misc')
  require('../model')
  // require('./elasticsearch')
  require('../migration')

  mediator.once('redis.ready', async () => {
    console.log('- REDIS'.padEnd(15), 'READY')
    // Init data for redis
    require('./data')
  })
}
