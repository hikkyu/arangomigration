#!/usr/bin/env node
const program = require('commander')
const inquirer = require('inquirer')
const colors = require('colors')
const packageJSON = require('../../package.json')
const apply = require('../lib/apply')
const status = require('../lib/status')

const commonsOptions = {
  url: ['--url <url>', 'URL of your database', 'http://localhost:8529'],
  username: ['--username <username>', 'System username', 'root'],
  password: ['--password <password>', 'System user password', 'root'],
}

program.version(packageJSON.version, '-v, --version')

program
  .command('apply [directory]')
  .description('Apply all migration files from a directory')
  .option(...commonsOptions.url)
  .option(...commonsOptions.username)
  .option(...commonsOptions.password)
  .option(
    '--insert-data <boolean>',
    'Insert data from ~/your-migration-folder/data',
    true,
  )
  .action(function (directory = './migration', options) {
    const { url, username, password, insertData } = options

    console.info("\nLet's migrate!\n".yellow)
    console.info(`   Directory: [${directory.cyan}]`)
    console.info(`   URL: [${url.cyan}]`)
    console.info(`   Username: [${username.cyan}]`)
    console.info(`   Password: [${password.cyan}]`)
    console.info(`   Insert data: [${insertData.toString().cyan}]\n`)

    inquirer
      .prompt({
        type: 'confirm',
        name: 'confirmApply',
        message: 'These options are correct ?',
      })
      .then(({ confirmApply }) => {
        if (!confirmApply) {
          process.exit(0)
        }

        return apply({
          directory,
          url,
          username,
          password,
          insertData,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  })

program
  .command('status [directory]')
  .description('TODO')
  .option(...commonsOptions.url)
  .option(...commonsOptions.username)
  .option(...commonsOptions.password)
  .action(function (directory = './migration', options) {
    const { url, username, password } = options

    console.info('\nGetting status with this options:\n'.yellow)
    console.info(`   Directory: [${directory.cyan}]`)
    console.info(`   URL: [${url.cyan}]`)
    console.info(`   Username: [${username.cyan}]`)
    console.info(`   Password: [${password.cyan}]\n`)

    return status({
      directory,
      url,
      username,
      password,
    }).catch((error) => {
      console.error(error)
    })
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) program.help()
