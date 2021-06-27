import bodyParser from 'body-parser';
import { addUsersToGroupRouter, genericRouter, groupRouter, userRouter } from './route/index.js';
import { apiLog, generalErrorHandling, pageNotFound } from './middlewares/index.js';

export default class Router {
  constructor(app) {
    this.app = app;

    this.init();
  }

  init() {
    this.app.use(bodyParser.json());

    this.app.use(apiLog);

    this.app.use('/', genericRouter());
    this.app.use('/user', userRouter());
    this.app.use('/group', groupRouter());
    this.app.use('/addUsersToGroup', addUsersToGroupRouter());

    this.app.all('*', pageNotFound);

    this.app.use(generalErrorHandling);

    return this.app;
  }
}
