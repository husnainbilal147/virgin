import config from './config';
import express from 'express';

async function startServer() {
  const app = express();
  await require('./bootstrap').default({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      console.error(err);
      process.exit(1);
      return;
    }
    console.debug(`Server listening on port: ${config.port}`);
  });
}

startServer();
