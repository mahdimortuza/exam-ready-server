import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: 'GET, POST, PUT, PATCH, DELETE',
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const serverStatus = {
    message: 'Hello world. from exam ready server.',
    timestamp: new Date(),
  };
  res.send(serverStatus);
};
// server
app.get('/', test);

// server
// app.post('/sample/put/data', function (req, res) {
//   console.log('receiving data ...');
//   console.log('body is ', req.body);
//   res.send(req.body);
// });

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
