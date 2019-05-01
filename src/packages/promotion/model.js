import { Schema, mongoose } from '../../utils/mongoose'
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
  type: {
    type: String,
  },
  value: {
    type: Schema.Types.ObjectId,
  },
  startAt: Date,
  endAt: Date,
}, {
  versionKey: false,
})

schema.statics = statics

export default mongoose.model('Promotion', schema)
