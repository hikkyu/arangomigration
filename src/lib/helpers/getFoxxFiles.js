const fs = require('fs')
const path = require('path')

module.exports = function getFoxFiles() {
  const dirPath = path.join(
    process.cwd(),
    'node_modules/arangomigration/src/foxx-service',
  )

  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, fileNames) => {
      if (err) return reject(err)
      if (!fileNames) return reject(new Error('No file found'))

      resolve(
        fileNames.map((fileName) => {
          return {
            fileName,
            relativePath: path.relative(
              process.cwd(),
              path.join(dirPath, fileName),
            ),
            fullPath: path.join(dirPath, fileName),
          }
        }),
      )
    })
  })
}
