import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // Your favorite port
  port: Number(process.env.PORT || 3000),

  // Base Shopee URL
  baseUrl: 'https://shopee.co.id/api',

  // API configs
  api: {
    prefix: '/api',
  },

  // Used by winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};
