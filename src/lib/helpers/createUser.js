const getSystemDB = require('./getSystemDB')

module.exports = async function createUser(user, options) {
  const systemDB = getSystemDB(options)

  await systemDB
    .runServiceScript('/migration', 'create-user', user)
    .then((response) => {
      console.info(`    ✅ User ${user.username.cyan} created or already exist`)
    })
}
