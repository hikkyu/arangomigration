const colors = require('colors')
const createUser = require('./helpers/createUser')
const grantUser = require('./helpers/grantUser')
const createCollection = require('./helpers/createCollection')
const createEdgeCollection = require('./helpers/createEdgeCollection')
const createIndex = require('./helpers/createIndex')
const createAnalyzer = require('./helpers/createAnalyzer')
const createView = require('./helpers/createView')

module.exports = async function applyCreation(stuffToCreate, db, options) {
  const {
    collections,
    edgeCollections,
    users,
    indexes,
    analyzers,
    views,
  } = stuffToCreate

  if (users) {
    console.info(`  ↳ Create users`)

    for (const user of users) {
      await createUser(user, options)
      await grantUser(user, db, options)
    }
  }

  if (collections) {
    console.info(`  ↳ Create collections`)
    for (const collection of collections) {
      await createCollection(collection, db)
    }
  }

  if (edgeCollections) {
    console.info(`  ↳ Create edgeCollections`)

    for (const edgeCollection of edgeCollections) {
      await createEdgeCollection(edgeCollection, db)
    }
  }

  if (indexes) {
    console.info(`  ↳ Create indexes`)

    for (const index of indexes) {
      await createIndex(index, db)
    }
  }

  if (analyzers) {
    console.info(`  ↳ Create analyzers`)

    for (const analyzer of analyzers) {
      await createAnalyzer(analyzer, db)
    }
  }

  if (views) {
    console.info(`  ↳ Create views`)

    for (const view of views) {
      await createView(view, db)
    }
  }
}
