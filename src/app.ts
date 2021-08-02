import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';
import app from './loaders/express';
import Logger from './loaders/logger';

/**
 * A little hack here
 * Import/Export can only be used in 'top-level code'
 * Well, at least in node 10 without babel and at the time of writing
 * So we are using good old require.
 **/
app
  .listen(config.port, () => {
    Logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
  })
  .on('error', err => {
    Logger.error(err);
    process.exit(1);
  });
