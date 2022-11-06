import { registerAs } from '@nestjs/config';

export default registerAs('message', () => {
  return {
    hostname: process.env.MESSAGE_Q_HOST,
    protocol: process.env.MESSAGE_Q_PROTOCOL,
    port: process.env.MESSAGE_Q_PORT,
  };
});
