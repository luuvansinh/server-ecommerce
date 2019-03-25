/**
 * Connect to database
 */

import { mongoose } from '../utils/mongoose'
import config from '../configs'

// Debug
// mongoose.set('debug', true)

export default async function () {
  try {
    await mongoose.connect(config.db, config.dbOptions)
    console.log('- DATABASE'.padEnd(15), 'READY -', config.db)
  } catch (error) {
    console.log('Error on connecting to db: ', error)
    console.log('\x1b[31m', '*** PLEASE CONNECT TO DATABASE BEFORE RUN SERVER', '\x1b[0m')
    process.exit(1)
  }
}
