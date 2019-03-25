
const accountKitVersion = 'v1.1'

export default {
  // Db
  db: process.env.DB_PATH || 'mongodb://localhost/ecommerce-dev',
  dbOptions: {
    native_parser: true,
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 300000,
    socketTimeoutMS: 300000,
    useNewUrlParser: true,
  },

  // Elasticsearch path
  elasticsearchPath: process.env.ELASTICSEARCH_PATH,

  // Secret for token
  secret: '59)SUIJOc^Apc*W(',

  // key account kit
  accountKit: {
    appId: '270845610370126',
    csrf: 'Account Kit',
    version: accountKitVersion,
    secret: '2801ff7ec4558b5f870c2f8ded4a582e',
  },

  // End points
  endPoints: {
    accountKit: `https://graph.accountkit.com/${accountKitVersion}/me`,
    exchangeToken: `https://graph.accountkit.com/${accountKitVersion}/access_token`,
  },
}
