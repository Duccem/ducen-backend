import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  key: process.env.AUTH_KEY || '123456',
}));
