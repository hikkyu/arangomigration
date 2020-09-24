const migrationCollectionName = 'migration'
module.exports = async function prepareVersion(file, fileContent, db) {
  let migrationCollection = db.collection(
    `${migrationCollectionName}-${fileContent.service || 'main'}`,
  )

  if (!(await migrationCollection.exists())) {
    await migrationCollection.create()
  }

  const { version, name, fileName, relativePath } = file
  const isVersionExists = await migrationCollection.documentExists(version)

  if (isVersionExists) {
    const migrationDoc = await migrationCollection.document(version)

    if (migrationDoc.isMigrationApplied === true) {
      return {
        isAlReadyExist: true,
      }
    } else {
      return {
        isAlReadyExist: false,
      }
    }
  }

  return migrationCollection
    .save(
      {
        _key: version,
        migration: fileContent,
        name,
        fileName,
        relativePath,
        isMigrationApplied: false,
      },
      { returnNew: true },
    )
    .then(() => ({
      isAlReadyExist: false,
    }))
}
