import logger from '../logger/index.js';
import { performance } from 'perf_hooks';

class Log {
  constructor() {
    this.logMethods();
  }

  logMethods() {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
    methods.forEach(method => this[method] = new Proxy(this[method], {
      apply: async (target, thisArg, args) => {
        const argPosition = 0;
        const minValidArrLength = 1;
        const stringifyArg = args.length >= minValidArrLength ? JSON.stringify(args[argPosition]) : '{}';

        const message = `| Service:${thisArg.constructor.name} | Method: ${target.name} | Arguments: ${stringifyArg}`;
        logger.info(message);

        try {
          const start = performance.now();
          const methodExResult = await target.apply(thisArg, args);
          const end = performance.now();

          logger.info(`${target.name} method execution time: ${end - start} ms`);

          return methodExResult;
        } catch (e) {
          const message = `Error during execution of Method: ${target.name} with `
            + `Arguments ${stringifyArg}. Details: ${e.message}`;
          logger.error(message);

          throw new Error(e);
        }
      },
    }));
  }
}

export default Log;
