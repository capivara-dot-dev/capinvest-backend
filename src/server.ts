// Files imports
import app from './app';
import { env } from './config/config';

// Types imports
import { AddressInfo } from 'net';

process.on('uncaughtException', (err: Error) => {
  console.error(err.name, err.message);
});

const listener = app.listen(env.PORT || '3000', () => {
  if (env.NODE_ENV === 'DEVELOPMENT') {
    console.log(`App is listening at ${(listener.address() as AddressInfo).port}`);
  }
});
