module.exports = function createIndex(index, db) {
  const { collection, ...restOfIndex } = index

  return db
    .collection(collection)
    .ensureIndex(restOfIndex)
    .then(() => {
      console.info(`    ✅ Index ${index.name.cyan} created`)
    })
    .catch((error) => {
      if (error.code === 409) {
        console.info(`    ✅ Collection ${index.name.cyan} already exist`)
      } else {
        throw error
      }
    })
}
