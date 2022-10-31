import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost:',
  };
});
