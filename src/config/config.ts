import { PrismaClient } from '@prisma/client';

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  // Need to only load it if in development mode, else use the env
  // variables setted by the enviroment
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

export const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

export const prisma = new PrismaClient();
