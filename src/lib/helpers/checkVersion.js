const migrationCollectionName = 'migration'
module.exports = async function checkVersion(file, fileContent, db) {
  let migrationCollection = db.collection(
    `${migrationCollectionName}-${fileContent.service || 'main'}`,
  )

  if (!(await migrationCollection.exists())) {
    ;`  ❌ ${file.fileName.red} name is not compatible with filename specifications`
    return false
  }

  const { version } = file
  const migrationDoc = await migrationCollection.document(version)

  if (migrationDoc.isMigrationApplied) {
    console.info(`  ✅ ${file.version}`)
    return true
  } else {
    console.warn(`  ❌ ${file.version}`)
  }
  return migrationDoc.isMigrationApplied
}
