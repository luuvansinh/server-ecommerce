import elasticsearch from 'elasticsearch'
import config from '../../configs'
import { to } from '../../utils'

const INDEX_PREFIX = process.env.NODE_ENV === 'test' ? 'zody_test_' : 'zody_'

const getIndexName = (type) => {
  return INDEX_PREFIX + type
}

const MAPPINGS = {
  business: require('./mapping/business.json'),
  user: require('./mapping/user.json'),
  review: require('./mapping/review.json'),
  hashtag: require('./mapping/hashtag.json'),
  voucher: require('./mapping/voucher.json'),
}

const client = new elasticsearch.Client({
  host: config.get('elasticsearchPath') || 'localhost:9200',
  // log: 'trace',
})

/**
 * Ping check
 *
 */
const ping = async () => {
  const { error } = await to(client.ping())
  if (error) {
    console.trace(error)
    console.log('\x1b[31m', '*** PLEASE CONNECT TO ELASTICSEARCH BEFORE RUN SERVER', '\x1b[0m')
    process.exit(1)
  } else {
    console.log('- ELASTICSEARCH'.padEnd(15), 'READY')
  }
}

/**
 * Check index is existed or not
 *
 * @param {String} type type of index
 */
const checkIndexExists = async (type) => {
  // Get index name
  const indexName = getIndexName(type)

  // Check exists before create
  const { data } = await to(client.indices.exists({ index: indexName }))
  return data
}

/**
 * Create new mapping, remove if existed first
 *
 * @param {String} type name of mapping, locale in "mapping" folder
 */
const createIndex = async (type) => {
  if (!MAPPINGS[type]) {
    return console.log(`*** NO MAPPING "${type}" FOUND, PLEASE CHECK AGAIN!`)
  }

  // Get index name
  const indexName = getIndexName(type)

  // Check exists before create
  const isExists = await checkIndexExists(indexName)

  // Return if existed
  if (isExists) {
    return console.log(`*** INDEX "${indexName}" WAS CREATED!`)
  }

  const createResult = await to(client.indices.create({ index: indexName, body: MAPPINGS[type] }))
  if (createResult.error) {
    console.log(`*** CREATE INDEX "${indexName}" FAILED, PLEASE CHECK AGAIN!`)
    console.log(createResult.error)
    return
  }

  console.log(`*** CREATE INDEX "${indexName}" SUCCESSFULLY!`)
}

/**
 * Delete index, then recreate again
 *
 * @param {String} type type of index
 */
const deleteThenCreateIndex = async (type) => {
  // Get index name
  const indexName = getIndexName(type)

  // Check exists before create
  const existsResult = await to(client.indices.exists({ index: indexName }))

  // Remove if existed
  if (existsResult.data) {
    await client.indices.delete({ index: indexName })
  }

  // Create
  await createIndex(type)
}

/**
 * Bulk
 *
 * @param {Array} payload list actions
 */
const bulkDocuments = async (type, payload) => {
  // Get index name
  const indexName = getIndexName(type)

  const { data, error } = await to(client.bulk({
    index: indexName,
    type,
    body: payload,
  }))

  if (error) {
    // TODO: add logger instead of console.log
    console.log('*** Bulk document failed', error)
    return error
  }

  return data
}

/**
 * Index new document to es
 *
 * @param {String} type type of target
 * @param {String} _id _id of document
 * @param {Object} payload data to index
 */
const addDocument = async (type, id, payload) => {
  // Get index name
  const indexName = getIndexName(type)
  id = id.toString()

  const { error } = await to(client.index({
    index: indexName,
    type,
    id,
    body: payload,
  }))

  if (error) {
    // TODO: add logger instead of console.log
    console.log('*** Index document failed', error)
  }
}

/**
 * Update document to es
 *
 * @param {String} type type of target
 * @param {String} _id _id of document
 * @param {Object} payload data to update
 */
const updateDocument = async (type, id, payload) => {
  // Get index name
  const indexName = getIndexName(type)
  id = id.toString()

  const { error } = await to(client.update({
    index: indexName,
    type,
    id,
    body: {
      doc: payload,
    },
  }))

  if (error) {
    // TODO: add logger instead of console.log
    console.log('*** Update document failed', error)
  }
}

/**
 * Delete document out of es
 *
 * @param {String} type type of target
 * @param {String} _id _id of document
 */
const deleteDocument = async (type, id) => {
  // Get index name
  const indexName = getIndexName(type)
  id = id.toString()

  const { error } = await to(client.update({
    index: indexName,
    type,
    id,
  }))

  if (error) {
    // TODO: add logger instead of console.log
    console.log('*** Delete document failed', error)
  }
}

/**
 * Do search and return
 *
 * @param {String} type type of target
 * @param {Object} payload query data
 */
const search = async (type, payload) => {
  // Get index name
  const indexName = getIndexName(type)

  const { data, error } = await to(client.search({
    index: indexName,
    body: payload,
  }))

  if (error) {
    // TODO: add logger instead of console.log
    console.log('*** Search documents failed', error)
    return error
  }

  return data
}

export {
  ping,
  checkIndexExists,
  createIndex,
  deleteThenCreateIndex,
  bulkDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  search,
}
