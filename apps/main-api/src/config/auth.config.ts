import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    key: process.env.AUTH_KEY || '123456',
    facebookClientID: process.env.FACEBOOK_CLIENT_ID || '',
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    googleClientID: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    twitterClientID: process.env.TWITTER_KEY || '',
    twitterClientSecret: process.env.TWITTER_SECRET || '',
    linkedinClientID: process.env.LINKEDIN_CLIENT_ID || '',
    linkedinClientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    githubClientID: process.env.GITHUB_CLIENT_ID || '',
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  };
});
