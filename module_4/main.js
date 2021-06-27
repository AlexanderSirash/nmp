import express from 'express';
import Router from './src/routes.js';
import { server } from './config/index.js';
import db from './src/db/index.js';
import logger from './src/logger/index.js';

(async () => {
    try {
      await db.init();
      const app = express();
      new Router(app);
      app.listen(process.env.APP_PORT, () =>
        console.log(`Server ${server.version} was started on port ${process.env.APP_PORT}`));
    } catch (error) {
      console.error(error.message);
    }
  }
)();

process
.on('unhandledRejection', (err) => {
  const message = `Unhandled rejection was detected within the application. Details: ${err}`;
  logger.error(message);
})
.on('uncaughtException', (error) => {
  const message = `${error.name} ${error.message}, ${error.stack}`;
  logger.error(message);
});

