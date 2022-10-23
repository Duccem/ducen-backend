import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  uri: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017',
  name: process.env.DATABASE_NAME || 'ducen2',
}));
