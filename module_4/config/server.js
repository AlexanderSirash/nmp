import packageConfig from '../../package.json';

export const server = {
  version: packageConfig.version,
  name: packageConfig.name,
  description: packageConfig.description,
};
