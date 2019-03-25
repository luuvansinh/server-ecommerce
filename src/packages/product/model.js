import { Schema, mongoose } from '../../utils/mongoose'
import statics from './static'
import configs from '../../configs'
import { format } from '../../utils'

const schema = new Schema({
  name: {
    type: String,
    required: [true, configs.message.productNameRequired],
  },
  price: {
    type: Number,
    required: [true, configs.message.productPriceRequired],
  },
  quantity: {
    type: Number,
    required: [true, configs.message.productQuantityRequired],
  },
  covers: [String],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  statistic: {
    ordered: {
      type: Number,
      default: 0,
    },
    viewed: {
      type: Number,
      default: 0,
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  searchString: {
    type: String,
    default: '',
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  sizes: [String],
  notifyWhenQuantityBelow: {
    type: Number,
    default: 5,
  },
  desc: {
    type: String,
    default: '',
  },
}, {
  versionKey: false,
})

schema.statics = statics

schema.pre('save', function (next) {
  this.searchString = format.nonAccentVietnamese(this.name)
  next()
})

export default mongoose.model('Product', schema)
