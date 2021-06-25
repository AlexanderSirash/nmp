import express from 'express';
import Router from './src/routes.js';
import config from './config/index.js';
import db from './src/db/index.js';

(async () => {
    try {
      await db.init();
      const app = express();
      new Router(app);
      app.listen(process.env.APP_PORT, () =>
        console.log(`Server ${config.server.version} was started on port ${process.env.APP_PORT}`));
    } catch (error) {
      console.error(error.message);
    }
  }
)();

