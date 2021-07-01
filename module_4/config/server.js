import packageConfig from '../../package.json';

export const server = {
  port: process.env.APP_PORT,
  version: packageConfig.version,
  name: packageConfig.name,
  description: packageConfig.description,
};
