const colors = require('colors')
const getSystemDB = require('./getSystemDB')

module.exports = async function createNorConnectToDatabase(
  databaseName,
  options,
) {
  console.info(`  ↳ Creating database ${databaseName}...`)
  const systemdb = getSystemDB(options)

  return await systemdb
    .createDatabase(databaseName)
    .catch((error) => {
      if (error.code === 409) {
        return true
      }

      throw error
    })
    .then((allreadyExist) => {
      if (allreadyExist) {
        console.info(`    ✅ Database ${databaseName.cyan} already exist`)
      } else {
        console.info(
          `    ✅ Database ${databaseName.cyan} successfully created`,
        )
      }

      return systemdb.database(databaseName)
    })
}
