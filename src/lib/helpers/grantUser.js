const getSystemDB = require('./getSystemDB')

module.exports = async function createUser(user, db, options) {
  const systemDB = getSystemDB(options)

  await systemDB
    .runServiceScript('/migration', 'grant-user', {
      username: user.username,
      dbName: db.name,
    })
    .then((response) => {
      console.info(
        `    ✅ User ${user.username.cyan} grant to access ${db.name}`,
      )
    })
}
