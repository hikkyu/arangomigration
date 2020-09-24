module.exports = function createEdgeCollection(edgeCollection, db) {
  return db
    .createEdgeCollection(edgeCollection.name)
    .then(() => {
      console.info(`    ✅ EdgeCollection ${edgeCollection.name.cyan} created`)
    })
    .catch((error) => {
      if (error.code === 409) {
        console.info(
          `    ✅ EdgeCollection ${edgeCollection.name.cyan} already exist`,
        )
      } else {
        throw error
      }
    })
}
