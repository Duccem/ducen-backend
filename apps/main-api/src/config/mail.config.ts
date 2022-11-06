import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => {
  return {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.env.MAIL_USER,
    password: process.env.MAIL_PASS,
  };
});
