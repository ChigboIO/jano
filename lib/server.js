'use strict';

require('colors');
// const path = require('path');
const cp = require('child_process');
const spawn = cp.spawn;

class Server {
  static start() {
    const nodeServer = spawn('node', ['./bin/www']);

    console.log('Starting jano application...'.blue.italic);
    console.log('');

    nodeServer.stdout.on('data', data => {
      console.log('**'.green, data.toString().trim());
    });

    nodeServer.stderr.on('data', data => {
      console.log('**'.red, data.toString().trim());
    });

    nodeServer.on('exit', code => {
      console.log('');
      console.log(`...exiting jano application: ${code}`.italic);
      console.log('');
    });
  }
}

module.exports = Server;
