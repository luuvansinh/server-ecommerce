import photo from './photo'

/**
 * Avatar
 *
 */
const avatar = () => {
  return photo.avatar()
}

/**
 * User
 *
 */
const user = () => {
  return {
    _id: '',
    avatar: avatar(),
    name: 'Anonymous',
  }
}


const date = () => {
  return new Date('2001-01-01T00:00:00Z')
}

export default {
  date,
  user,
}
