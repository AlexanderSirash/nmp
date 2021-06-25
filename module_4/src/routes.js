import user from './route/user.js';
import generic from './route/generic.js';
import bodyParser from 'body-parser';
import config from '../config/index.js';
import group from './route/group.js';
import addUsersToGroup from './route/addUsersToGroup.js';

export default class Router {
  constructor(app) {
    this.app = app;

    this.init();
  }

  init() {
    this.app.use(bodyParser.json());

    this.app.use('/', generic());
    this.app.use('/user', user());
    this.app.use('/group', group());
    this.app.use('/addUsersToGroup', addUsersToGroup());

    this.app.all('*', function (req, res, next) {
      res.status(config.statusCodes.NOT_FOUND).json({ error: { title: 'Not found', description: 'Page not found!' } });
    });

    this.app.use(function (error, req, res, next) {
      if (error) {
        res.status(config.statusCodes.INTERNAL_ERROR).json({
          error: {
            title: 'Bad request',
            description: error.message,
          },
        });
      } else {
        res.status(config.statusCodes.OK);
      }
    });

    return this.app;
  }
}
