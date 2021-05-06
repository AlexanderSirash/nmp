import packageConfig from '../package.json';

export default {
  PORT: 3000,
  version: packageConfig.version,
  name: packageConfig.name,
  description: packageConfig.description,
};
