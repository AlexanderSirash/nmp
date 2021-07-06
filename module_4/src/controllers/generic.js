import { server } from '../../config/index.js';

export class GenericController {
  async getGenericInfoAboutServer(req, res) {
    return res.json({
      version: server.version,
      name: server.name,
      description: server.description,
    });
  }
}

