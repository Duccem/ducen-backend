import { registerAs } from '@nestjs/config';

export default registerAs('image', () => {
  return {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  };
});
