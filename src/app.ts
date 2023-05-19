// Packages imports
import express from 'express';
import helmet from 'helmet';
import routes from './v1/routes';

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use((req, _res, next) => {
    console.log(`${req.method} - ${req.path}`);
    next();
  });
}

app.use('/v1', routes);

app.all('*', (_req, res) => {
  res.status(404).json({
    status: 'failed',
    message: 'path not found',
  });
});

export default app;
