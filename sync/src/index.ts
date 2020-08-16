import express, { json } from 'express';
import cors from 'cors';

import syncRouter from './sync/Router';
import identityRouter from './identity/Router';

const app = express();
const port = 3000;

function errorHandler(error, _request, response, _next) {
  const defaultErrorStatusCode = 500;
  return response
    .status(error.status || defaultErrorStatusCode)
    .json({ error: error.name, message: error.message });
}

app.use(cors());
app.use(json());
app.use('/identity', identityRouter);
app.use('/lists', syncRouter);
app.use('/health', (_, response) => response.status(200).send());
app.use(errorHandler);

app.listen(port, () => console.log(`Sync server listening at http://localhost:${port}`));
