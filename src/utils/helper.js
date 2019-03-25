import slug from 'slug'
// import fs from 'fs'
// import moment from 'moment'
// import diacritics from 'diacritics'

// const removeDiacritics = diacritics.remove

// // Define constant
// const chars = '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ' // No "0" and "O" due to mobile font
// const numbers = '0123456789'

// /**
//  * Return start of month of give date
//  *
//  * @param {String} date
//  */
// const startOfMonth = (date) => {
//   if (!date) {
//     return new Date(moment().startOf('m').toISOString())
//   } else {
//     return new Date(moment(date).startOf('m').toISOString())
//   }
// }

// /**
//  * Check folder is existed or not
//  * If not exists, create new
//  *
//  * @param {String} path
//  */
// const checkFileExists = (path, fileName) => {
//   const folderExists = fs.existsSync(path)
//   if (!folderExists) {
//     fs.mkdirSync(path)
//   }

//   return fs.existsSync(`${path}/${fileName}`)
// }

// /**
//  * Get string index from array of object id
//  *
//  * @param  {Array}  array
//  * @param  {String} id
//  */
// const getIndexFromArrayObjectId = (array = [], id = '') => {
//   let index = -1

//   // Cast to string
//   id = id.toString()

//   // Loop
//   for (const i in array) {
//     if (array[i] && array[i].toString() === id) {
//       index = i
//       break
//     }
//   }

//   return index
// }

// /**
//  * Random a string in range
//  *
//  * @param {Number} min
//  * @param {Number} max
//  * @param {Number} ignore
//  */
// const randomIntegerInRange = (min, max, ignore) => {
//   const array = []
//   for (let i = min; i <= max; i += 1) {
//     if (i !== ignore) {
//       array.push(i)
//     }
//   }
//   const rand = Math.floor(Math.random() * ((array.length - 1) + 1))
//   return array[rand]

//   // Random again if rand is equals to ignore
//   // if (!Number.isNaN(ignore) && rand === ignore) {
//   //   return await new Promise(resolve => resolve(randomIntegerInRange(min, max, ignore)))
//   // }
//   // return rand
// }

// /**
//  * Find duplicate item in array
//  *
//  * @param {Array} arr
//  */
// const findDuplicateInArray = (arr) => {
//   const sortedArr = arr.slice().sort()
//   const results = []
//   for (let i = 0; i < sortedArr.length - 1; i += 1) {
//     if (sortedArr[i + 1] === sortedArr[i]) {
//       results.push(sortedArr[i])
//     }
//   }

//   return results.map(i => i)
// }

// /**
//  * Random a string with given length
//  *
//  * @param  {Number}  length
//  * @param  {Boolean} isNoUnderscore
//  * @return {String}
//  */
// const randomStringWithLength = (length, isNoUnderscore) => {
//   const firstUnderscore = parseInt(length / 3, 10)
//   const secondUnderscore = parseInt(length * 2 / 3, 10)
//   let result = '';
//   /* eslint no-plusplus:[0] */
//   for (let i = length; i > 0; --i) {
//     if ((i === firstUnderscore || i === secondUnderscore) && !isNoUnderscore) {
//       result += '_'
//     }
//     result += chars[Math.round(Math.random() * (chars.length - 1))]
//   }
//   return result
// }

// /**
//  * Random a numeric string for verification
//  *
//  */
// const randomVerificationCode = () => {
//   let code = ''
//   for (let i = 6; i > 0; --i) {
//     code += numbers[Math.round(Math.random() * (numbers.length - 1))]
//   }
//   return code
// }

// /**
//  * Transform string to searchable string
//  *
//  * @param  {String} string
//  */
// const convertToSearchString = (string) => {
//   // Remove all special characters, except: _ - .
//   string = string.replace(/[`~!@#$%^&*()|+=?;:'",<>{}[]\/]/gi, '')
//   return new RegExp(removeDiacritics(string).toLowerCase(), 'i')
// }

// /**
//  * convert bytes to megabybtes
//  *
//  * @param {Number} bytes
//  */
// const convertBytesToMB = (bytes) => {
//   const MB = bytes / (1024 ** 2)
//   return MB
// }

/**
 * Parse JSON
 *
 * @param value
 * @param defaultValue
 */
const parseJSONString = (value, defaultValue) => {
  try {
    JSON.parse(value)
    return JSON.parse(value)
  } catch (e) {
    return defaultValue
  }
}

/**
 * Get slug string
 *
 * @param {String} value
 */
const getSlug = (value) => {
  return slug(value).toLowerCase()
}

/**
 * Delay ms
 *
 * @param {Number} ms
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Get location of object
 *
 * @param {Object} obj object contain location
 */
const getLocation = ({ location }) => {
  if (!location || !location.coordinates || !location.coordinates.length) {
    return null
  }
  return {
    lat: location.coordinates[1],
    lon: location.coordinates[0],
  }
}

export default {
  parseJSONString,
  getSlug,
  delay,
  getLocation,
}
