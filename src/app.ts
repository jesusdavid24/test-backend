import express from 'express';
import ConfigExpress from './config/express';
import { passportLocal, passportJwt } from './config/passport';
import routes from './routes';
import { config  } from 'dotenv';

if (process.env.NODE_ENV !== 'production') { config() }

const app = express();
const PORT = process.env.PORT ?? 3001;

ConfigExpress(app);
routes(app);

passportLocal();
passportJwt();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  
})