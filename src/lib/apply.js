const fs = require('fs')
const installOrReplaceFoxxService = require('./helpers/installOrReplaceFoxxService')
const getMigrations = require('./helpers/getMigrations')
const getMigrationFilesList = require('./helpers/getMigrationFilesList')
const applyData = require('./insertData')
const applyFile = require('./applyFile')

module.exports = async function apply(options) {
  await installOrReplaceFoxxService(options)
  const sortedByVersionEnhancedFilesList = await getMigrations(options)

  for (const file of sortedByVersionEnhancedFilesList) {
    await applyFile(file, options).catch((err) => {
      // TODO: Enhance this error message
      console.info('migration aborted:')
      console.error(err)
      process.exit(err)
    })
  }

  if (options.insertData && fs.existsSync(options.directory + '/data')) {
    const dataFiles = await getMigrationFilesList(options.directory + '/data')

    for (const dataFile of dataFiles) {
      await applyData(dataFile, options).catch((err) => {
        // TODO: Enhance this error message
        console.info('migration aborted:')
        console.error(err)
        process.exit(err)
      })
    }
  }
}
