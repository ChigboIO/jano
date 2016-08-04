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
    const projectName = params[1] || 'jano-project';
    if (this.checkFolderExists(projectName)) { return; }

    this.createProject(projectName);
  }

  checkFolderExists(folderName) {
    let check = null;

    try {
      const stats = fs.lstatSync(path.resolve(folderName));
      if (stats.isDirectory()) {
        console.log('The directory `' + folderName +
          '` already exist in the location. Use a different one.');
        check = true;
      }
    } catch (e) {
      check = null;
    }
    return check;
  }

  createProject(projectName) {
    fs.copy(path.resolve(__dirname, '..', 'template'), path.resolve(projectName), err => {
      if (err) return console.error(err);

      console.log('Generating project folders and files...', '');

      // move the .npmignore to .gitignore
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
        console.log('...done generating project folders', '');
        console.log('');
        this.runNpmInstall(projectName);
      });

      return null;
    });
  }

  runNpmInstall(projectName) {
    console.log('Running `npm install`...');

    const npm = spawn('npm', ['install'], { cwd: path.resolve(projectName) });

    npm.stdout.on('data', data => {
      console.log(data.toString());
    });

    // npm.stderr.on('data', data => {
    //   console.log('<<ERROR>> ', data.toString());
    // });

    npm.on('close', code => {
      console.log('...done installing application dependencies. Exit code: ' + code);
      console.log('');
      this.installSequelizeCli(projectName);
    });
  }

  installSequelizeCli(projectName) {
    console.log('Installing `sequelize-cli`...');

    /* eslint-disable no-unused-vars */
    exec('npm install sequelize-cli -g', (err, stderr, stdout) => {
      /* eslint-enable no-unused-vars */
      if (err) { return console.error(err); }

      // console.log(stdout);
      // console.log(stderr);
      console.log('...done installing sequelize-cli. Now you can run the `sequelize` commands');
      console.log('');

      this.initializeGit(projectName);

      return null;
    });
  }

  initializeGit(projectName) {
    console.log('Initializing git...');
    exec('git init', { cwd: path.resolve(projectName) }, (err, stderr, stdout) => {
      if (err) { return console.error(err); }

      console.log(stdout);
      console.log(stderr);
      console.log('...done initialize git in your project.');
      console.log('');
      this.printSummaryMessage(projectName);

      return null;
    });
  }

  printSummaryMessage(projectName) {
    console.log('');
    console.log('');
    console.log(`Next..., 'cd ${projectName}'`);
    console.log('To start your with nodemon in  dev env...: `npm run dev`');
    console.log('To run tests...: `npm test`');
    console.log('To check style linting...: `npm run lint`');
    console.log('');
    console.log('Run `sequelize help` to see available commands you can run for your models and migrations. Visit `http://docs.sequelizejs.com/en/latest/` for more details.');
    console.log('');
  }

}

module.exports = NewApplication;
