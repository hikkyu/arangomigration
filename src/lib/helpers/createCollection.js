module.exports = function createCollection(collection, db) {
  return db
    .createCollection(collection.name)
    .then(() => {
      console.info(`    ✅ Collection ${collection.name.cyan} created`)
    })
    .catch((error) => {
      if (error.code === 409) {
        console.info(`    ✅ Collection ${collection.name.cyan} already exist`)
      } else {
        throw error
      }
    })
}
