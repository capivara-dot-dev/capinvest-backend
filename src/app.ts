// Packages imports
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use((req, _res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
  });
}

export default app;
