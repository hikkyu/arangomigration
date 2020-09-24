function createUser() {
  const users = require('@arangodb/users')

  const { argv } = module.context
  const user = argv[0]
  let existingUser

  try {
    existingUser = users.document(user.username)
  } catch (error) {
    if (error.message !== 'user not found') {
      throw error
    }
  }

  if (!existingUser) {
    users.save(user.username, user.password)
  }
}

createUser()
