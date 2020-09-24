const { Database } = require('arangojs')

module.exports = function getSystemDB(options) {
  return new Database({
    url: options.url,
    auth: {
      username: options.username,
      password: options.password,
    },
  })
}
