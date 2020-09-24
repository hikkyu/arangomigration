module.exports = function createIndex(index, db) {
  const { collection, type, unique, fields, name } = index

  return db
    .collection(collection)
    .ensureIndex({
      name,
      type,
      unique,
      fields,
    })
    .then(() => {
      console.info(`    ✅ Index ${name.cyan} created`)
    })
    .catch((error) => {
      if (error.code === 409) {
        console.info(`    ✅ Collection ${name.cyan} already exist`)
      } else {
        throw error
      }
    })
}
