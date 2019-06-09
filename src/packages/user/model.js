import crypto from 'crypto'
import mongoose, { Schema } from 'mongoose'
import config from '../../configs'
import { format } from '../../utils'
import statics from './static'

const roles = config.roles.list.split(' ')


const { message } = config

const schema = new Schema({
  name: {
    type: String,
    maxlength: [
      128,
      message.nameMustLessThan128Chars,
    ],
  },
  searchString: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
  },
  city: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
    unique: true,
  },
  gender: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    unique: true,
  },
  statistic: {
    bill: {
      type: Number,
      default: 0,
    },
    expense: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: roles,
  },
  salt: String,
  hashedPassword: String,
  active: Boolean,
  address: {
    type: String,
    default: '',
  },
}, {
  versionKey: false,
})

/**
 * Index
 *
 */
schema.index({ city: 1 }).index({ searchString: 1 })

/**
 * Virtual
 */
schema.virtual('password').set(function (password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashedPassword = this.hashPassword(password)
}).get(function () {
  return this._password
})

/**
 * Methods
 */
schema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   */
  authenticate(plainText) {
    return this.hashPassword(plainText) === this.get('hashedPassword')
  },

  /**
   * Make salt
   *
   * @return {String}
   */
  makeSalt() {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Hash password
   *
   * @param {String} password
   */
  hashPassword(password) {
    if (!password || !this.get('salt')) return ''
    const salt = Buffer.from(this.get('salt'), 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString('base64')
  },
}


/**
 * Static functions
 */
schema.statics = statics

/**
 * Presave hook
 */
schema.pre('save', function (next) {
  // Set search string
  this.searchString = format.nonAccentVietnamese(this.name)
  this.phone = format.phone(this.phone)
  next()
})


export default mongoose.model('User', schema)
