const { map } = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')
const colors = require('colors')

const createNorConnectToDatabase = require('./helpers/createNorConnectToDatabase')
const applyCreation = require('./applyCreation')
const createCollection = require('./helpers/createCollection')
const prepareVersion = require('./helpers/prepareVersion')
const getSystemDB = require('./helpers/getSystemDB')
const validateVersion = require('./helpers/validateVersion')

module.exports = async function applyFile(file, options) {
  const fileInfo = fs.lstatSync(file.fullPath)

  if (fileInfo.isDirectory()) return false

  console.info(`\nApplying ${file.fileName} content`.yellow)

  const fileContent = yaml.safeLoad(fs.readFileSync(file.fullPath))
  const systemDB = getSystemDB(options)
  let fileDB = null

  if (fileContent) {
    // TODO: validate fileContent
    const { database, create, delete: toDelete } = fileContent
    let version = {}

    version = await prepareVersion(file, fileContent, systemDB)

    // Cut migration if already applied
    if (version.isAlReadyExist) {
      console.info('  ↳ This migration is already applied')
      return false
    }

    if (database) {
      fileDB = await createNorConnectToDatabase(database, options)
    }

    if (create) {
      await applyCreation(create, fileDB, options)
    }

    if (toDelete) {
      console.log('launch delete sequence')
    }

    await validateVersion(file, fileContent, systemDB)
  } else {
    console.warn('  ↳ This file is empty')
    return false
  }
}
