const yaml = require('js-yaml')
const fs = require('fs')
const getSystemDB = require('./helpers/getSystemDB')

module.exports = async function insertData(file, options) {
  console.info(`\nInserting ${file.fileName} content`.yellow)

  const fileContent = yaml.safeLoad(fs.readFileSync(file.fullPath))

  if (fileContent) {
    const { database, collection, data } = fileContent
    const systemDB = getSystemDB(options)

    const fileDB = systemDB.database(database)
    const fileCollection = fileDB.collection(collection)

    await fileCollection
      .saveAll(data, {
        overwrite: true,
        overwriteMode: 'update',
        returnNew: true,
      })
      .then((saves) => {
        saves.forEach((save) => {
          if (save.error) {
            console.error(save)
          } else {
            console.info(`  ↳ Saved ${save._id}`)
          }
        })
      })
  } else {
    console.info(`  ↳ This file is empty`)
  }
}
