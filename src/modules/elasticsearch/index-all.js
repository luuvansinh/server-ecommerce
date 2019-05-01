import { to, helper } from '../../utils'
import { UserModel } from '../../model'
import { bulkDocuments } from './handler'
import processData from './process-data'

const TOTAL_DOCS_EACH_BULK = 1000

const query = async (model, condition = {}, page = 0) => {
  const { data } = await to(model.find(condition).skip(page * TOTAL_DOCS_EACH_BULK).limit(TOTAL_DOCS_EACH_BULK).lean())
  return data || []
}
/**
 * Index all users data from db to es
 *
 */
const user = async () => {
  let page = 0
  const index = async () => {
    const docs = await query(UserModel, {}, page)
    const actions = []
    docs.forEach((doc) => {
      const obj = processData.user(doc)
      const action = { index: { _id: doc._id.toString() } }
      actions.push(action)
      actions.push(obj)
    })

    // Bulk
    await bulkDocuments('user', actions)

    // Check data
    if (docs.length >= TOTAL_DOCS_EACH_BULK) {
      console.log(`*** INDEXED ${page * TOTAL_DOCS_EACH_BULK + docs.length} USER!`)
      page += 1
      await helper.delay(1000)
      await index(page)
    } else {
      console.log(`*** INDEXED ${page * TOTAL_DOCS_EACH_BULK + docs.length} DOCUMENTS OF "USER"!`)
    }
  }

  await index(page)
}

export default {
  user,
}
