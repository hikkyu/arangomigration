function grantUser() {
  const users = require('@arangodb/users')

  const { argv } = module.context
  const options = argv[0]

  users.grantDatabase(options.username, options.dbName)
}

grantUser()
