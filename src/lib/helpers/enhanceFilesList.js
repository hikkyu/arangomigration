const colors = require('colors')
const fs = require('fs')

const regexp = /(v?(?:\d*\.){2}(?:[\d]))-((\w|-)*)\.(?:yaml|yml)/

module.exports = function enhanceFilesList(filesList) {
  console.info(`\nCheck and enhance migrations files`.yellow)
  return filesList
    .filter((file) => {
      const fileInfo = fs.lstatSync(file.fullPath)

      return !fileInfo.isDirectory()
    })
    .map((file) => {
      const match = file.fileName.match(regexp)

      if (!match) {
        console.warn(
          `  ❌ ${file.fileName.red} name is not compatible with filename specifications`
            .red,
        )
        return {
          isNameValid: false,
          ...file,
        }
      }

      const version = match[1].replace('v', '')
      const name = match[2]

      console.info(
        `  ✅ ${file.fileName.cyan} will be version ${version.cyan} and its name will be ${name.cyan}`,
      )

      return {
        isNameValid: true,
        version,
        name,
        ...file,
      }
    })
}
