import mongoose, { Schema } from 'mongoose';
import statics from './static'
import { format } from '../../utils';

const status = ['pending', 'verified', 'completed', 'canceled']
const methods = ['COD', 'paypal']

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
    enum: status,
  },
  list: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    price: Number,
    quantity: Number,
    _id: false,
  }],
  note: {
    type: String,
    default: '',
  },
  paymentMethod: {
    type: String,
    enum: methods,
    default: 'COD',
  },
  total: {
    type: Number,
    default: 0,
  },
}, {
  versionKey: false,
})

schema.statics = statics

schema.pre('save', function (next) {
  this.phone = format.phone(this.phone)
  next()
})

export default mongoose.model('Order', schema)
