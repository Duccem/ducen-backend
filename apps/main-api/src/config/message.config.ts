import { registerAs } from '@nestjs/config';

export default registerAs('message', () => {
  return {
    hostname: process.env.MESSAGE_Q_HOST,
    protocol: process.env.MESSAGE_Q_PROTOCOL,
    port: process.env.MESSAGE_Q_PORT,
    username: process.env.MESSAGE_Q_USER,
    password: process.env.MESSAGE_Q_PASSWORD,
    vhost: process.env.MESSAGE_Q_VHOST,
  };
});
