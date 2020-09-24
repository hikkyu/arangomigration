const getMigrations = require('./helpers/getMigrations')
const statusFile = require('./statusFile')

module.exports = async function status(options) {
  const sortedByVersionEnhancedFilesList = await getMigrations(options)

  console.info('\nGetting status of migration files'.yellow)

  for (const file of sortedByVersionEnhancedFilesList) {
    await statusFile(file, options).catch((err) => {
      // TODO: Enhance this error message
      console.info('migration aborted:')
      console.error(err)
      process.exit(err)
    })
  }
}
