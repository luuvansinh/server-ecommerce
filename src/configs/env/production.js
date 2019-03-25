
const accountKitVersion = 'v1.1'

export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://localhost/ecommerce',
  dbOptions: {
    // useNewUrlParser: true,
    autoReconnect: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
  },

  // Elasticsearch path
  elasticsearchPath: process.env.ELASTICSEARCH_PATH,

  // Secret for user token
  secret: process.env.USER_TOKEN_SECRET,

  // key account kit
  accountKit: {
    appId: process.env.ACCOUNT_KIT_APP_ID,
    csrf: 'Account Kit',
    version: accountKitVersion,
    secret: process.env.ACCOUNT_KIT_SECRET,
  },

  // End points
  endPoints: {
    accountKit: `https://graph.accountkit.com/${accountKitVersion}/me`,
    exchangeToken: `https://graph.accountkit.com/${accountKitVersion}/access_token`,
  },
}
