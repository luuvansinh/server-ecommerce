import lodash from 'lodash'
import configs from '../configs'

/**
 * Return default photo
 *
 */
const defaultPhoto = () => {
  return `${configs.host.files}default-image.gif`
}

/**
 * Return default avatar
 *
 */
const defaultAvatar = () => {
  return `${configs.host.files}default-avatar.jpg`
}

/**
 * Avatar
 *
 * @param  {String} name
 */
const avatar = (name) => {
  return name ? (configs.host.files + name) : defaultAvatar()
}

/**
 * Cover
 *
 * @param  {String} name
 */
const cover = (name) => {
  return name ? (`${configs.host.files}${name}`) : defaultPhoto()
}

/**
 * Photo
 *
 * @param  {String} name
 */
const photo = (name) => {
  return name ? (configs.getIn(['host', 'files']) + name) : defaultPhoto()
}

/**
 * Get photo brief info
 *
 * @param {Object} data
 */
const briefInfo = (data) => {
  const obj = lodash.pick(data, ['_id', 'width', 'height'])
  obj.url = photo(data.name)
  return obj
}

/**
 * Get list covers
 *
 * @param {Array} names list covers
 * @param {boolean} hasDefaultCover has default if not found
 */
const covers = (coverNames = [], hasDefaultCover = true) => {
  let result = coverNames.map((item) => {
    return cover(item)
  })

  if (!result.length && hasDefaultCover) {
    result = [defaultPhoto()]
  }

  return result
}

/**
 * Get photos url
 *
 * @param {Array} photos
 */
const getPhotosUrl = (photos = []) => {
  if (!photos.length) {
    return []
  }

  return photos.map((item) => {
    return briefInfo(item)
  })
}

/**
 * Get Prefix for cover
 *
 * @param {String} name Name of cover
 * @param {String} typePrefix prefix
 */
const getPrefix = (name, typePrefix) => {
  return name ? `${configs.getIn(['amazon', 'prefix', typePrefix])}${name}` : null
}
// Export
export default {
  avatar,
  cover,
  covers,
  getPhotosUrl,
  getPrefix,
  defaultPhoto,
}
