import bodyParser from 'body-parser';
import express from 'express';

export function mockExpressApp(router) {
  const app = express();

  app.use(bodyParser.json());
  app.use(router());

  return app;
}
