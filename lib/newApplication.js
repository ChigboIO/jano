'use strict';

require('colors');
const path = require('path');
const fs = require('fs-extra');
const cp = require('child_process');
const exec = cp.exec;
const spawn = cp.spawn;

class NewApplication {
  constructor() {
    this.checkFolderExists = this.checkFolderExists.bind(this);
    this.createProject = this.createProject.bind(this);
    this.runNpmInstall = this.runNpmInstall.bind(this);
    this.installSequelizeCli = this.installSequelizeCli.bind(this);
    this.initializeGit = this.initializeGit.bind(this);
    this.printSummaryMessage = this.printSummaryMessage.bind(this);
  }

  setUp(params) {
    const projectName = params[0].match(/^\w+[\w\-_\.]*/) ? params.shift() : 'jano-project';
    if (this.checkFolderExists(projectName)) { return; }
    console.log('');
    this.createProject(projectName, params);
  }

  checkFolderExists(folderName) {
    let check = null;

    try {
      const stats = fs.lstatSync(path.resolve(folderName));
      if (stats.isDirectory()) {
        console.log('The directory `' + folderName.bold +
          '` already exist in the location. Use a different one.');
        check = true;
      }
    } catch (e) {
      check = null;
    }
    return check;
  }

  createProject(projectName, params) {
    fs.copy(path.resolve(__dirname, '..', 'template'), path.resolve(projectName), err => {
      if (err) return console.error(err);

      console.log('Generating project folders and files...'.italic);

      // rename the .npmignore to .gitignore
      fs.renameSync(
        path.resolve(projectName, '.npmignore'),
        path.resolve(projectName, '.gitignore')
      );

      const walker = fs.walk(path.resolve(projectName));

      walker.on('data', item => {
        console.log('Create:: '.bold.green + projectName.bold + '/' +
          path.relative(path.resolve(projectName), item.path));
      });

      walker.on('end', () => {
        console.log('...done generating project folders'.italic);
        console.log('');
        this.runNpmInstall(projectName, params);
      });

      return null;
    });
  }

  runNpmInstall(projectName, params) {
    if (params.indexOf('--no-npm') !== -1) {
      console.log('Skipped npm install'.italic);
      console.log('');
      return this.installSequelizeCli(projectName, params);
    }

    console.log('Running `npm install`...'.italic);

    const npm = spawn('npm', ['install'], { cwd: path.resolve(projectName) });

    npm.stdout.on('data', data => {
      console.log(data.toString());
    });

    npm.on('close', code => {
      console.log(`...done installing application dependencies. Exit code: ${code}`.italic);
      console.log('');
      this.installSequelizeCli(projectName, params);
    });

    return null;
  }

  installSequelizeCli(projectName, params) {
    if (params.indexOf('--no-sequelize') !== -1) {
      console.log('Skipped sequelize-cli'.italic);
      console.log('');
      return this.initializeGit(projectName, params);
    }

    exec('npm list sequelize-cli -g', (e) => {
      if (!e) {
        console.log('Detected Sequlelize CLI in your computer:'.italic.blue);
        console.log('');
        this.initializeGit(projectName, params);
        return null;
      }

      console.log('Installing `sequelize-cli`...'.italic);

      exec('npm install sequelize-cli -g', (err) => {
        if (err) { return console.error(err); }

        console.log('...done installing sequelize-cli.'.italic);
        console.log('');

        this.initializeGit(projectName, params);
        return null;
      });

      return null;
    });

    return null;
  }

  initializeGit(projectName, params) {
    if (params.indexOf('--no-git') !== -1) {
      console.log('Skipped git init'.italic);
      console.log('');
      return this.printSummaryMessage(projectName, params);
    }

    console.log('Initializing git...'.italic);
    exec('git init', { cwd: path.resolve(projectName) }, (err, stderr, stdout) => {
      if (err) { return console.error(err); }

      console.log(stdout);
      console.log(stderr);
      console.log('...done initialize git in your project.'.italic);
      console.log('');
      this.printSummaryMessage(projectName, params);

      return null;
    });

    return null;
  }

  printSummaryMessage(projectName) {
    console.log('');
    console.log('');
    console.log(`${'Next'.underline}...`, `'cd ${projectName}'`.green.italic);
    console.log(`${'Run tests'.underline}...`, '`npm test`'.green.italic);
    console.log(`${'Run style guide check'.underline}...`, '`npm run lint`'.green.italic);
    console.log(`${'Run app in dev environment'.underline}...`, '`npm run dev`'.green.italic);
    console.log('');
    console.log(`Run ${'sequelize help'.green} to see available commands you can run for your models and migrations. Visit '${'http://docs.sequelizejs.com/en/latest/'.blue}' for more details.`);
    console.log('');
  }

}

module.exports = NewApplication;
