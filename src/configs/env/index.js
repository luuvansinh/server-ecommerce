import validation from './cross-env/validation'
import common from './cross-env/common'
import limit from './cross-env/limit'
import message from './cross-env/message'

/*
 * App common variables
 */
const app = {
  env: {
    production: 'production',
    development: 'development',
  },

  // Regex
  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{10,12}$)/,
    email: /\S+@\S+\.\S+/,
    appId: /[a-zA-Z0-9._]{2,32}/,
    name: /[a-zA-Z0-9\s]{2,64}/,
  },


  // Format
  format: {
    date: 'DD/MM/YYYY, HH:mm',
  },

  // List roles
  roles: {
    list: 'admin editor',
    admin: 'admin',
    editor: 'editor',
  },


  // Locales
  locales: {
    en: 'en',
    vi: 'vi',
  },

  // Default values for server
  defaultValues: {
    city: 'da-nang',
    query: {
      all: 'all',
    },
    date: new Date('2001-01-01T00:00:00Z').toISOString(),
  },
}

export default {
  ...app,
  ...validation,
  ...common,
  ...limit,
  ...message,
}
