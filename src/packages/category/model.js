import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'
import configs from '../../configs'

const schema = new Schema({
  name: {
    type: String,
    required: [true, configs.message.categoryNameRequired],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  versionKey: false,
})

schema.statics = statics

export default mongoose.model('Category', schema)
