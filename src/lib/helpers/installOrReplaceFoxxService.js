const fs = require('fs')
const filter = require('lodash/filter')
const JSZip = require('jszip')
const getSystemDB = require('./getSystemDB')
const getFoxxFiles = require('./getFoxxFiles')

module.exports = async function installOrReplaceFoxxService(options) {
  const systemDB = getSystemDB(options)
  const installedServicesList = await systemDB.listServices(false)
  const serviceMount = '/migration'

  // Build in memory zip
  const zip = new JSZip()
  const files = await getFoxxFiles()

  files.forEach((file) => {
    zip.file(file.fileName, fs.readFileSync(file.fullPath))
  })

  const buffer = await zip.generateAsync({ type: 'nodebuffer' })

  const isAlReadyInstalled =
    filter(installedServicesList, { name: 'migration' }).length > 0

  if (isAlReadyInstalled) {
    await systemDB.replaceService(serviceMount, buffer)
  } else {
    await systemDB.installService(serviceMount, buffer)
  }
}
