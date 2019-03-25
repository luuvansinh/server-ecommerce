import Redis from 'ioredis'

// Init redis
let redis = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')

const runRedis = (mediator) => {
  redis = new Redis(6379, process.env.REDIS_PATH || '127.0.0.1')
  redis.on('ready', () => {
    mediator.emit('redis.ready')
  })

  redis.on('error', (err) => {
    console.log('redis.error', err)
    // Exit app
    process.exit(1)
  })
}

const getStore = () => {
  return redis
}

export default {
  runRedis,
  getStore,
}
