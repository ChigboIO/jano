'use strict';

const packageJson = require('../package.json');

class Helper {
  static showHelp() {
    console.log(
      'Use `jano new [<project-name>]` to create a new project. \n' +
      'NOTE: If you omit the <project-name>, "jano-project" will be used.'
    );
  }

  static showVersion() {
    console.log(`jano v${packageJson.version}`);
  }
}

module.exports = Helper;
