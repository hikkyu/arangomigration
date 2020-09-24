const { map } = require('lodash')
const yaml = require('js-yaml')
const fs = require('fs')
const colors = require('colors')

const getSystemDB = require('./helpers/getSystemDB')
const checkVersion = require('./helpers/checkVersion')

module.exports = async function statusFile(file, options) {
  const fileInfo = fs.lstatSync(file.fullPath)

  if (fileInfo.isDirectory()) return false

  const fileContent = yaml.safeLoad(fs.readFileSync(file.fullPath))
  const systemDB = getSystemDB(options)
  let fileDB = null

  if (fileContent) {
    // TODO: validate fileContent
    let version = {}

    return checkVersion(file, fileContent, systemDB)
  } else {
    return false
  }
}
