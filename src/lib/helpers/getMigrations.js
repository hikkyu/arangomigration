const { sortBy } = require('lodash')
const getMigrationFilesList = require('./getMigrationFilesList')
const enhanceFilesList = require('./enhanceFilesList')

module.exports = async function getMigrations(options) {
  const migrationFilesList = await getMigrationFilesList(options.directory)
  const enhancedFilesList = enhanceFilesList(migrationFilesList)
  return sortBy(enhancedFilesList, 'version')
}
