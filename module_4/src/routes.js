import bodyParser from 'body-parser';
import { addUsersToGroupRouter, genericRouter, groupRouter, loginRouter, userRouter } from './route/index.js';
import { apiLog, checkRights, generalErrorHandling, pageNotFound, validateToken } from './middlewares/index.js';
import cors from 'cors';

export default class Router {
  constructor(app) {
    this.app = app;

    this.init();
  }

  init() {
    this.app.use(cors());
    this.app.use(bodyParser.json());

    this.app.use(apiLog);

    this.app.use('/', genericRouter());
    this.app.use('/login', loginRouter());
    this.app.use('*', validateToken);

    this.app.use('*', checkRights);
    this.app.use('/user', userRouter());
    this.app.use('/group', groupRouter());
    this.app.use('/addUsersToGroup', addUsersToGroupRouter());

    this.app.all('*', pageNotFound);

    this.app.use(generalErrorHandling);

    return this.app;
  }
}
