import mongoose, { Schema } from 'mongoose'
import statics from './static'

const schema = new Schema({
  name: {
    type: String,
    default: '',
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  // categories or product
  applyForType: {
    type: String,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  startAt: Date,
  endAt: Date,
  active: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
})

schema.statics = statics

export default mongoose.model('Promotion', schema)
