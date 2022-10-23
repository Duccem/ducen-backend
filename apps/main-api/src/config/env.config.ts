import { NestLogger } from '@ducen/adaptors';
import { join } from 'path';

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

  const path = join(process.cwd(), 'app/main-api/environment', env);

  logger.log(`Selected env: ${env}`);
  logger.log(`Env file path: ${path}`);

  return path;
}
