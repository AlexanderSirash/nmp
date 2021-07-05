import { server } from '../../config/index.js';

class Generic {
  async getGenericInfoAboutServer(req, res) {
    return res.json({
      version: server.version,
      name: server.name,
      description: server.description,
    });
  }
}

export default new Generic();
