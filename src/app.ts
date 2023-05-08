// Packages imports
import express from 'express';

const app = express();

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use((req, _res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
  });
}

export default app;
