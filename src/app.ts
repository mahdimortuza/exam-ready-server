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
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello world. from exam ready server.');
};
// server
app.get('/', test);

// // server
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello world. from exam ready server.');
// });

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
