const migrationCollectionName = 'migration'
module.exports = async function validateVersion(file, fileContent, db) {
  let migrationCollection = db.collection(
    `${migrationCollectionName}-${fileContent.service || 'main'}`,
  )

  if (!(await migrationCollection.exists())) {
    await migrationCollection.create()
  }

  const { version } = file
  const migrationDoc = await migrationCollection.document(version)

  return migrationCollection.update(
    version,
    {
      isMigrationApplied: true,
    },
    { returnNew: true },
  )
}
