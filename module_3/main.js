import express from 'express';
import Router from './src/routes.js';
import config from './config.js';

const app = express();

new Router(app);

app.listen(config.PORT, () => console.log(`Server ${config.version} was started on port ${config.PORT}`));
