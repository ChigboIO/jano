/* eslint-disable max-len */
'use strict';

const packageJson = require('../package.json');

class Helper {
  static showHelp() {
    Helper.showVersion();
    console.log(`
Usage:
'jano version|--version|-v'            :  ${'Show version number.'.italic}
'jano help|--help|-h'                  :  ${'Show this help message.'.italic}
'jano new [<project-name>] [OPTIONS]'  :  ${'To create a new jano project.'.italic}

NOTE: If you omit the <project-name>, ${'"jano-project"'.green.bold} will be used.

OPTIONS:
--no-npm       :  ${'Don\'t install default dependencies after generating the app.'.italic}
--no-git       :  ${'Don\'t initialize git in the project.'.italic}
--no-sequelize :  ${'Don\'t install sequelize-cli. NB: This is used for migrations and models'.italic}
    `);

    console.log(`Run ${'sequelize help'.green.italic} to see available commands you can run for your models and migrations. Visit '${'http://docs.sequelizejs.com/en/latest/'.blue}' for more details.`);
    console.log('');
  }

  static showVersion() {
    console.log(`jano v${packageJson.version}`);
  }
}

module.exports = Helper;
