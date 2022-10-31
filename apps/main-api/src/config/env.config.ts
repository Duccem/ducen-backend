import { NestLogger } from '@ducen/adaptors';
import { resolve } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();

const logger = new NestLogger();

export function getEnv() {
  let env = 'dev.env';

  switch (process.env.NODE_ENV) {
    case 'dev':
      env = 'dev.env';
      break;
    case 'testing':
      env = 'testing.env';
      break;
    case 'local':
      env = 'local.env';
      break;
  }

  const path = resolve(process.cwd(), 'apps/main-api/environments', env);

  logger.log(`Selected env: ${env}`);
  logger.log(`Env file path: ${path}`);

  return path;
}
