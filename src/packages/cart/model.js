import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  list: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
  }],
}, {
  versionKey: false,
})

schema.statics = statics

export default mongoose.model('Cart', schema)
