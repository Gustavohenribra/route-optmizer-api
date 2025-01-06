import express from 'express';
import bodyParser from 'body-parser';
import routeRoutes from './routes/routeRoutes';
import cors from "cors";
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(bodyParser.json());

app.use('/api', routeRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
