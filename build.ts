/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import Logger from './src/loaders/logger';

import childProcess from 'child_process';

(async () => {
  try {
    // Remove current build
    await remove('./build/');
    // Copy front-end files
    await copy('./src/public', './build/public');
    await copy('./src/views', './build/views');
    // Copy back-end files
    await exec('tsc', './');
  } catch (err) {
    Logger.error(err);
  }
})();

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, err => {
      return !!err ? rej(err) : res();
    });
  });
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, err => {
      return !!err ? rej(err) : res();
    });
  });
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        Logger.info(stdout);
      }
      if (!!stderr) {
        Logger.warn(stderr);
      }
      return !!err ? rej(err) : res();
    });
  });
}
