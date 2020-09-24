module.exports = function createAnalyzer(view, db) {
  const { name, ...restOfView } = view

  return db
    .createView(name, view)
    .then(() => {
      console.info(`    ✅ View ${view.name.cyan} created`)
    })
    .catch((error) => {
      if (error.code === 409) {
        console.info(`    ✅ View ${view.name.cyan} already exist`)
      } else {
        throw error
      }
    })
}
