import packageConfig from '../../package.json';

export default {
  PORT: process.env.APP_PORT,
  version: packageConfig.version,
  name: packageConfig.name,
  description: packageConfig.description,
};
