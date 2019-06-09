import { Schema, model, SchemaTypes } from 'mongoose';
import statics from './static'

const schema = new Schema({
  email: String,
  paid: Boolean,
  payerID: String,
  paymentID: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
}, {
  versionKey: false,
})

schema.statics = statics

export default model('Payment', schema)
