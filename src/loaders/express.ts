import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import helmet from 'helmet';
import routes from '../api';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**
 * Health Check endpoints
 * @TODO Jelasin Kenapa disini
 */
app.get('/status', (req, res) => {
  res.status(200).end();
});
app.head('/status', (req, res) => {
  res.status(200).end();
});

// Useful kalau lagi ada di behind a reverse proxy (ex:Heroku)
app.enable('trust proxy');

// Security
app.use(helmet());

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

// Middleware that transforms the raw string of req.body into json
app.use(bodyParser.json());

// Load API routes
app.use(config.api.prefix, routes());

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
const viewsDir = path.join(__dirname, '../views');
app.set('views', viewsDir);

const staticDir = path.join(__dirname, '../public');
app.use(express.static(staticDir));

app.get('/', (req: Request, res: Response) => {
  res.sendFile('home.html', { root: viewsDir });
});
/************************************************************************************
 *                                       end
 ***********************************************************************************/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

export default app;
