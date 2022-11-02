import { registerAs } from '@nestjs/config';
import * as srvAcc from './ducen-google-services.json';

export default registerAs('firebase', () => {
  return {
    serviceAccount: JSON.stringify(srvAcc),
  };
});
