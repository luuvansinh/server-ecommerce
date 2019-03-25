import { to, helper } from '../../utils'
import { BusinessModel, UserModel, VoucherGroupModel } from '../../model'
import { bulkDocuments } from './handler'
import processData from './process-data'

const TOTAL_DOCS_EACH_BULK = 1000

const query = async (model, condition = {}, page = 0) => {
  const { data } = await to(model.find(condition).skip(page * TOTAL_DOCS_EACH_BULK).limit(TOTAL_DOCS_EACH_BULK).lean())
  return data || []
}

/**
 * Index all businesses data from db to es
 *
 */
const business = async () => {
  let page = 0
  const index = async () => {
    const docs = await query(BusinessModel, {}, page)
    const actions = []
    docs.forEach((doc) => {
      const obj = processData.business(doc)
      const action = { index: { _id: doc._id.toString() } }
      actions.push(action)
      actions.push(obj)
    })

    // Bulk
    await bulkDocuments('business', actions)

    // Check data
    if (docs.length >= TOTAL_DOCS_EACH_BULK) {
      console.log(`*** INDEXED ${page * TOTAL_DOCS_EACH_BULK + docs.length} BUSINESSES!`)
      page += 1
      await index(page)
    } else {
      console.log(`*** INDEXED ${page * TOTAL_DOCS_EACH_BULK + docs.length} DOCUMENTS OF "BUSINESS"!`)
    }
  }

  await index(page)
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

/**
 * Index all reviews data from db to es
 *
 */
const review = async () => {

}

/**
 * Index all hashtags data from db to es
 *
 */
const hashtag = async () => {

}

/**
 * Index all voucher data from db to es
 *
 */
const voucher = async () => {
  let page = 0
  let countDoc = 0
  const index = async () => {
    const docs = await query(VoucherGroupModel, {}, page)
    const actions = []
    docs.forEach((doc) => {
      const data = processData.voucher(doc)
      countDoc += data.length
      data.forEach((item) => {
        const action = { index: { _id: item._id.toString() } }
        delete item._id
        actions.push(action)
        actions.push(item)
      })
    })

    // Bulk
    await bulkDocuments('voucher', actions)

    // Check data
    if (docs.length >= TOTAL_DOCS_EACH_BULK) {
      console.log(`*** INDEXED ${countDoc} VOUCHER!`)
      page += 1
      await helper.delay(1000)
      await index(page)
    } else {
      console.log(`*** INDEXED ${countDoc} DOCUMENTS OF "VOUCHER"!`)
    }
  }

  await index(page)
}

export default {
  business,
  user,
  review,
  hashtag,
  voucher,
}
