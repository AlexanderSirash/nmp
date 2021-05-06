import user from './route/user.js';
import generic from './route/generic.js';
import bodyParser from 'body-parser';
import statusCodes from '../statusCodes.js';

export default class Router {
  constructor(app) {
    this.app = app;

    this.init();
  }

  init() {
    this.app.use(bodyParser.json());

    this.app.use('/', generic());
    this.app.use('/user', user());

    this.app.all('*', function (req, res, next) {
      res.status(statusCodes.notFound).json({ error: { title: 'Not found', description: 'Page not found!' } });
    });

    this.app.use(function (error, req, res, next) {
      if (error) {
        res.status(statusCodes.badRequest).json({ error: { title: 'Bad request', description: error.message } });
      } else {
        res.status(statusCodes.ok);
      }
    });

    return this.app;
  }
}
