if (process.env.NODE_ENV !== 'test') {
  require('dotenv').config()
}
require('./src')
